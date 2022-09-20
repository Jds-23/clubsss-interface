import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
// import { useSubgraph } from "../hooks/useSubgraph";
import Button from "../components/Button/Button";
import ClubCard from "../components/ClubCard/ClubCard";
import CreateYourClubModal from "../components/CreateYourClubModal/CreateYourClubModal";
import { useCreateAClubModal } from "../context/CreateAClubContextProvider";
import { useClubs } from "../hooks/useClubs";

export default function Home() {
  // const data = useSubgraph();
  const { open, setOpen } = useCreateAClubModal();
  const clubs = useClubs();
  console.log(clubs);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateYourClubModal open={open} setOpen={setOpen} />

      <div className="flex flex-col-reverse lg:flex-row mt-2 lg:mt-4 px-4 max-w-[1340px] mx-auto">
        <div className="w-full">
          <h1 className="font-extrabold text-3xl w-full max-w-xl ">
            Join your favorite clubs and take part in the discussions{" "}
          </h1>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {clubs?.map((club) => {
              return (
                <ClubCard
                  address={club.id}
                  bioOfClub=""
                  nameOfClub={club.clubName}
                  postCount={club.ideasCount}
                  tags={[]}
                />
              );
            })}
          </div>
        </div>
        <div className="w-full lg:w-96">
          <div className="relative w-full mb-4 lg:ml-4 bg-black rounded-lg p-3">
            <h1 className="text-white font-bold text-lg">
              Create your club now
            </h1>
            <p className="text-xs text-lightGray opacity-60">
              Connect with more like minded people and discover more things!
            </p>
            <img
              src="/img/create-club.png"
              className="w-20 h-20 absolute right-0 bottom-0"
            />
            <Button onClick={() => setOpen(true)} className="mt-4 text-sm">
              Get Started Now 🚀
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
