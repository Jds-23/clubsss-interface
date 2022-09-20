import Head from "next/head";
import React from "react";
import Button from "../../../components/Button/Button";

const Club = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full h-36 bg-orange-200"></div>
      <div className="flex flex-col-reverse lg:flex-row lg:mt-2 px-4 max-w-[1340px] mx-auto">
        <div className="w-full">
          <img src="/img/garga.webp" className="rounded-md -mt-24 w-48 h-48" />
          <h1 className="mt-6 font-bold text-3xl">The Happy Club</h1>
          <p className="mt-3 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            eget lobortis velit. Ut ultricies urna et massa pharetra, blandit
            gravida nisi fermentum. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Integer eget lobortis velit. Ut ultricies urna et
            massa pharetra, blandit gravida nisi fermentum.
          </p>
          <div className="w-full flex items-center rounded-lg mt-4 p-4 bg-black">
            <input
              placeholder="What are you thinking about?"
              className="w-full grow border border-slate-600 rounded-lg px-6 py-3 bg-gray text-white outline-none"
            />
            <Button className="ml-4 whitespace-nowrap px-6 py-3 text-base">
              Post to Club
            </Button>
          </div>
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
            <div className="border-b pb-1 mt-2 border-b-lightGray flex items-center">
              <div className="flex items-center opacity-50 h-full mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </div>
              <div>
                <h1 className="font-bold text-lg">
                  🔥 Treasury Request: $5,000 to scale Metapass, our
                  NFT-ticketing product
                </h1>
                <h1 className=" text-xs mt-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Intr
                  eget lobortis velit. Ut ultricies urna et massa pharetra, blan
                  gravida nisi fermentum.
                </h1>
                <div className="flex items-center mt-1.5">
                  <div className="flex items-center">
                    <img src="/img/garga.webp" className="w-6 h-6 rounded" />
                    <span className="font-bold text-xs ml-1 opacity-60">
                      The Happy Club |
                    </span>

                    <span className="font-bold text-xs ml-1 opacity-60">
                      Posted by 0x899...dd3
                    </span>
                  </div>
                  <button className="ml-1 opacity-30 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>
                    <p className="text-[10px] ml-1">2 Comments</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-96">
          <div className="w-full -mt-12 overflow-hidden rounded-lg">
            <div className="w-full  bg-primary text-white p-4 flex items-center justify-between">
              <div className="text-center">
                <h4 className="text-2xl">120</h4>
                <h4 className="text-xs">Posts</h4>
              </div>
              <div className="text-center">
                <h4 className="text-2xl">120</h4>
                <h4 className="text-xs">Posts</h4>
              </div>
              <div className="text-center">
                <h4 className="text-2xl">120</h4>
                <h4 className="text-xs">Posts</h4>
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