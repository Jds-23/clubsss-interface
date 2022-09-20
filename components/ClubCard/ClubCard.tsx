import Link from "next/link";
import React from "react";
import Button from "../Button/Button";

const ClubCard = ({
  address,
  nameOfClub,
  postCount,
  tags,
  bioOfClub,
}: {
  address: string;
  nameOfClub: string;
  bioOfClub: string;
  postCount: number | undefined;
  tags: { text: string; color: string }[];
}) => {
  return (
    <Link href={`/club/${address}`}>
      <div className="border-2 cursor-pointer hover:border-primary border-lightGray rounded-lg w-full overflow-hidden">
        <div className="w-full h-20 bg-orange-300" />
        <div className="w-full px-3 pb-3 -mt-3">
          <div className="flex items-center">
            <img src="/img/garga.webp" className="rounded-md w-16 h-16" />
            <div className="ml-2">
              <p className="text-lg font-bold truncate hover:text-clip">
                {nameOfClub}
              </p>
              {<p className="text-[10px] font-semibold">{postCount} Posts</p>}
            </div>
          </div>
          <div className="mt-3 flex items-center">
            {tags.map((tag) => (
              <div
                key={tag.text}
                className={`px-3 text-xs py-0.5 rounded-sm mr-1 bg-orange-200 text-orange-600`}
              >
                {tag.text}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center">
            <p className="font-medium truncate hover:text-clip text-xs">
              {bioOfClub}
            </p>
          </div>
          <Button className="mt-4 px-8 py-2">See Discussion 👉</Button>
        </div>
      </div>
    </Link>
  );
};

export default ClubCard;
