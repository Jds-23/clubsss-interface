import useSWR from "swr";
import { clubv1subgraph } from "../constants";
import { request } from "graphql-request";
import { ethers } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";

interface IdeaInterface {
  id: string;
  user: string;
  score: number;
  message: string;
  metadata: string;
  commentsCount: number;
}
const QUERY = (address: string) => `{
    ideas(where:{club:"${address}"}){
     id
     club{
        id
        type
      }
     message
     metadata
     user{
       id
     }
     upScore
     downScore
     commentsCount
   }
   }`;
// @ts-ignore
const fetcher = (query) => request(clubv1subgraph, query);

export function useIdeasOfClub(address: string): IdeaInterface[] | undefined {
  const { data } = useSWR(QUERY(address), fetcher, { refreshInterval: 1000 });
  return data?.ideas?.map((idea: any) => {
    const upScore = ethers.BigNumber.from(idea.upScore);
    const downScore = ethers.BigNumber.from(idea.downScore);

    const score =
      idea.club.type === "0" ? formatEther(upScore.toString()) : upScore;
    return {
      id: idea.id,
      user: idea.user.id,
      score: parseFloat(score.toString()),
      message: idea.message,
      metdaata: idea.metadata,
      commentsCount: parseFloat(idea.commentsCount),
      club: idea.club.id,
    };
  });
}
