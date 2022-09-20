import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import {
  useApiContract,
  useMoralis,
  useWeb3Contract,
  useWeb3ExecuteFunction,
} from "react-moralis";
import Button from "../../../components/Button/Button";
import PostCard from "../../../components/PostIdea/PostCard";
import { useClub } from "../../../hooks/useClubs";
import { useIdeasOfClub } from "../../../hooks/useIdeasOfClub";
import useToast from "../../../hooks/useToast";
import Link from "next/link";
import ClubContractAbi from "../../../constants/abis/ClubContract.json";
import { formatEther, isAddress } from "ethers/lib/utils";
import { nFormatter } from "../../../utils";
import useInviteContract from "../../../hooks/useInviteContract";
import Modal from "../../../components/Modal/Modal";

interface MetadataInterface {
  clubName: string;
  about: string;
  cover: string;
  display: string;
}
const Club = () => {
  const router = useRouter();
  const { address } = router.query;
  const club = useClub(typeof address === "string" ? address : "");
  const [metadata, setMetadata] = useState<MetadataInterface>();
  const [metadataError, setMetadataError] = useState(false);
  const ideas = useIdeasOfClub(typeof address === "string" ? address : "");
  useEffect(() => {
    const metadataUrl = club?.metadata;
    if (!metadataUrl || metadataUrl === "") return;
    if (metadata) return;
    fetch(metadataUrl)
      .then((res) => res.json())
      .then((res) => setMetadata(res.description))
      .catch((err) => {
        setMetadataError(true);
      });
  }, [club, metadata]);

  const { account } = useMoralis();

  const { runContractFunction, data, error, isLoading, isFetching } =
    useWeb3Contract({
      contractAddress: typeof address === "string" ? address : undefined,
      functionName: "memberWeight",
      abi: ClubContractAbi,
      params: { _member: account ?? "" },
    });
  useEffect(() => {
    runContractFunction();
  }, [runContractFunction]);

  const { invite, invites } = useInviteContract(
    typeof address === "string" && club?.type === 3 ? address : undefined,
    account ?? undefined
  );
  console.log(typeof address === "string" && club?.type === 3, invites);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [invitee, setInvitee] = useState("");
  const [inviteStatus, setInviteStatus] = useState<string>();
  useEffect(() => {
    if (!isAddress(invitee)) {
      setInviteStatus("Enter Valid Address");
    } else {
      setInviteStatus(undefined);
    }
  }, [invitee]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal
        open={openInviteModal}
        setOpen={setOpenInviteModal}
        title="Invite Member"
      >
        <div className="p-2">
          <label className="font-bold mt-1">Club’s Name</label>
          <input
            className="text-xs mb-2 w-full active:outline-primary focus:outline-primary px-4 py-3 rounded-md bg-[#f8f8f8] border border-lightGray"
            value={invitee}
            onChange={(e) => setInvitee(e.target.value)}
            placeholder="Invitee"
          />
          <Button
            disabled={!!inviteStatus}
            onClick={() => {
              if (isAddress(invitee)) invite(invitee);
            }}
            className="mt-2"
            block
          >
            {inviteStatus ? inviteStatus : "Invite"}
          </Button>
        </div>
      </Modal>
      <div className="w-full h-36 relative overflow-hidden bg-orange-200">
        {metadata?.cover && (
          <img
            src={metadata?.cover}
            className="w-full top-0 left-0 object-contain"
          />
        )}
      </div>
      <div className="flex relative flex-col-reverse lg:flex-row lg:mt-2 px-4 max-w-[1340px] mx-auto">
        <div className="w-full">
          {metadata?.display ? (
            <img
              src={metadata?.display}
              className="rounded-md border-2 border-lightGray mx-auto lg:mx-0 -mt-24 w-48 h-48"
            />
          ) : (
            <div className="rounded-md mx-auto lg:mx-0 -mt-24 w-48 h-48 bg-orange-400" />
          )}
          <h1 className="mt-4 text-center lg:text-left lg:mt-6 font-bold text-3xl">
            {club?.clubName}
          </h1>
          <div className="bg-black lg:hidden pb-2 rounded-lg">
            <div className="w-full rounded-lg mt-2  bg-primary text-white p-4 flex items-center justify-around">
              <>
                <div className="text-center">
                  <h4 className="text-2xl">{club?.ideasCount}</h4>
                  <h4 className="text-xs">Posts</h4>
                </div>
                {data && (
                  <div className="text-center">
                    <h4 className="text-2xl">
                      {nFormatter(
                        parseFloat(
                          club?.type === 0
                            ? formatEther(data.toString() ?? "0")
                            : data.toString() ?? "0"
                        ),
                        3
                      )}
                    </h4>
                    <h4 className="text-xs">Your Vote Strength</h4>
                  </div>
                )}
                {invites && (
                  <div className="text-center">
                    <h4 className="text-2xl">{invites?.toString()}</h4>
                    <h4 className="text-xs">Invites</h4>
                  </div>
                )}
              </>
            </div>
            <div className="flex items-center">
              <>
                <Link href={`/club/${address}/post`}>
                  <Button className="mx-auto mt-2  whitespace-nowrap px-6 py-3 text-base">
                    Post to Club
                  </Button>
                </Link>
                {invites && (
                  <Button
                    onClick={() => setOpenInviteModal(true)}
                    className="mx-auto mt-2  whitespace-nowrap px-6 py-3 text-base"
                  >
                    Invite
                  </Button>
                )}
              </>
            </div>
          </div>
          <p className="mt-3 text-sm">{metadata?.about}</p>
          <div className="mt-3 w-full border-b pb-1 border-b-gray flex items-center">
            <div className={`mr-2 text-xs cursor-pointer ${"text-gray"}`}>
              Trending this week
            </div>
            <div
              className={`mr-2 text-xs cursor-pointer ${"text-gray opacity-60"}`}
            >
              Latest Posts
            </div>
            <div
              className={`mr-2 text-xs cursor-pointer ${"text-gray opacity-60"}`}
            >
              Top posts this week
            </div>
          </div>
          <div className="w-full mt-6">
            {ideas?.map((idea) => (
              <PostCard
                key={idea.id}
                clubName={club?.clubName}
                commentsCount={idea.commentsCount}
                id={idea.id}
                score={idea.score}
                user={idea.user}
                message={idea.message}
                metadata={idea.metadata}
                displayOfClub={metadata?.display}
              />
            ))}
          </div>
        </div>
        <div className="w-full hidden lg:block lg:w-96">
          <div className="w-full -mt-12 overflow-hidden rounded-lg">
            <div className="bg-black pb-2 rounded-lg">
              <div className="w-full rounded-lg mt-2 bg-primary text-white p-4 flex items-center justify-around">
                <>
                  <div className="text-center">
                    <h4 className="text-2xl">{club?.ideasCount}</h4>
                    <h4 className="text-xs">Posts</h4>
                  </div>
                  {data && (
                    <div className="text-center">
                      <h4 className="text-2xl">
                        {nFormatter(
                          parseFloat(
                            club?.type === 0
                              ? formatEther(data.toString() ?? "0")
                              : data.toString() ?? "0"
                          ),
                          3
                        )}
                      </h4>
                      <h4 className="text-xs">Your Vote Strength</h4>
                    </div>
                  )}
                  {invites && (
                    <div className="text-center">
                      <h4 className="text-2xl">{invites?.toString()}</h4>
                      <h4 className="text-xs">Invites</h4>
                    </div>
                  )}
                </>
              </div>
              <div className="flex items-center">
                <>
                  <Link href={`/club/${address}/post`}>
                    <Button className="mx-auto mt-2  whitespace-nowrap px-6 py-3 text-base">
                      Post to Club
                    </Button>
                  </Link>
                  {invites && (
                    <Button
                      onClick={() => setOpenInviteModal(true)}
                      className="mx-auto mt-2  whitespace-nowrap px-6 py-3 text-base"
                    >
                      Invite
                    </Button>
                  )}
                </>
              </div>
            </div>
            {/* <div className="w-full bg-black text-white p-4"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Club;
