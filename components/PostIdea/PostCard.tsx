import Link from "next/link";
import React, { useCallback } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import useToast from "../../hooks/useToast";
import useVote from "../../hooks/useVote";
import { getEllipsisTxt, nFormatter } from "../../utils";

const PostCard = ({
  id,
  user,
  clubName,
  commentsCount,
  displayOfClub,
  message,
  metadata,
  score,
}: {
  id: string;
  user: string;
  score: number;
  message: string;
  metadata: string;
  commentsCount: number;
  clubName: string;
  displayOfClub: string | undefined;
}) => {
  console.log(id.split("-"));
  const address = id.split("-")[0];
  const index = id.split("-")[1];
  const { vote } = useVote({ address, index });
  return (
    <Link href={`/post/${id}`}>
      <div className="cursor-pointer border-b pb-1 mt-2 border-b-lightGray flex items-center">
        <div className="flex items-center opacity-50 h-full mr-2">
          <div className="flex-col flex items-center">
            <button className="cursor-pointer" onClick={() => vote()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6 -mb-2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </button>
            {nFormatter(score, 4)}
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg">{message}</h1>
          {/* <h1 className=" text-xs mt-1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Intr
      eget lobortis velit. Ut ultricies urna et massa pharetra, blan
      gravida nisi fermentum.
    </h1> */}
          <div className="flex items-center mt-1.5">
            <div className="flex items-center">
              {displayOfClub ? (
                <img src={displayOfClub} className="w-6 h-6 rounded" />
              ) : (
                <div className="w-6 h-6 bg-orange-300 rounded" />
              )}
              <span className="font-bold text-xs ml-1 opacity-60">
                {clubName} |
              </span>

              <span className="font-bold text-xs ml-1 opacity-60">
                Posted by {getEllipsisTxt(user)}
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
              <p className="text-[10px] ml-1">{commentsCount} Comments</p>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
