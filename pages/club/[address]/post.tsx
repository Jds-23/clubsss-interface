import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useMoralisFile, useWeb3ExecuteFunction } from "react-moralis";
import Button from "../../../components/Button/Button";
import useToast from "../../../hooks/useToast";
import ClubContractAbi from "../../../constants/abis/ClubContract.json";
import { jsonFile } from "../../../utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Post = () => {
  const router = useRouter();
  const address = router.asPath.split("/")[2];

  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(false);
  const [metadata, setMetadata] = useState<string>();

  const [postStatus, setPostStatus] = useState<string>();

  useEffect(() => {
    if (message.length < 10) {
      setPostStatus("Message should be of more then >10 characters");
    } else {
      setPostStatus(undefined);
    }
  }, [setPostStatus, message]);

  const contractProcessor = useWeb3ExecuteFunction();

  const { txSuccess, txWaiting, error: errorToast } = useToast();

  const { error, isUploading, moralisFile, saveFile } = useMoralisFile();

  const post = useCallback(async () => {
    if (typeof address !== "string" || message.length < 10) return;
    try {
      setPostStatus("Saving Message in IPFS");
      const file = jsonFile("metadata.json", { description });
      const _metadata = (await saveFile(file.name, file, { saveIPFS: true }))
        ?._url;

      let options = {
        contractAddress: address,
        functionName: "postIdea",
        abi: ClubContractAbi,
        params: {
          _message: message,
          _metadata,
        },
      };
      setPostStatus("Poping Wallet to Pay for Gas");
      await contractProcessor.fetch({
        params: options,
        onSuccess: async (tx: any) => {
          setPostStatus("Minting in blockchain");
          await tx.wait();
          txSuccess("Posted Idea", "");
          setPostStatus(undefined);
          setMessage("");
          setDescription("");
        },
        onError: (error) => {
          errorToast("Error");
          setPostStatus(undefined);
          console.log(error);
        },
      });
    } catch (err) {
      errorToast("Error");
      setPostStatus(undefined);
    }
  }, [contractProcessor, address, message, description, saveFile]);
  return (
    <div>
      <Head>
        <title>clubsss</title>
        <meta name="description" content="Generated by clubsss" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative lg:mt-2 px-4 max-w-[1340px] mx-auto">
        <button
          onClick={() => router.back()}
          className="opacity-50 mt-4 font-bold"
        >
          Go Back
        </button>
        <h1 className="font-extrabold text-3xl w-full mt-3 mb-4">
          Create a post{" "}
        </h1>
        <div className="w-full max-w-3xl">
          <div>
            <label className="font-bold mt-1">Title</label>
            <input
              className="text-xs mb-2 w-full active:outline-primary focus:outline-primary px-4 py-3 rounded-md bg-[#f8f8f8] border border-lightGray"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter Title"
            />
          </div>
          <div>
            <div className="flex mb-1 items-center">
              <label className="font-bold mt-1">Description</label>
              <Button
                onClick={() => setPreview(!preview)}
                className="ml-1  p-1 text-xs font-semibold opacity-80"
              >
                {!preview ? "📝 Edit" : "📰 Preview"}
              </Button>
            </div>
            {preview ? (
              <div className="text-xs mb-2 w-full h-44 markdown-style  active:outline-primary focus:outline-primary px-4 py-3 rounded-md bg-[#f8f8f8] border border-lightGray">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {description}
                </ReactMarkdown>
              </div>
            ) : (
              <textarea
                className="text-xs mb-2 w-full h-44  active:outline-primary focus:outline-primary px-4 py-3 rounded-md bg-[#f8f8f8] border border-lightGray"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (Markdown Suggested)"
              />
            )}
          </div>
          <Button
            disabled={!!postStatus}
            onClick={() => post()}
            className="mt-6 px-14 text-lg py-3.5"
          >
            {postStatus ? postStatus : "Create Post"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Post;
