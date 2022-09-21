import useSWR from "swr";
import { clubv1subgraph } from "../constants";
import { request } from "graphql-request";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";

interface IdeaInterface {
  id: string;
  user: string;
  score: number;
  message: string;
  metadata: string;
  club: string;
  commentsCount: number;
  comments: {
    id: string;
    metadata: string;
    user: string;
  }[];
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
const QUERYGETIDEA = (address: string) => `{
    ideas(where:{id:"${address}"}){
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
     comments{
      id
      user{
        id
      }
      metadata
      replies{
        id
        metadata
      }
    }
     upScore
     downScore
     commentsCount
   }
   }`;
// @ts-ignore
const fetcher = (query) => request(clubv1subgraph, query);

export function useIdeasOfClub(address: string): IdeaInterface[] | undefined {
  const { data } = useSWR(QUERY(address), fetcher, { refreshInterval: 7000 });
  return data?.ideas?.map((idea: any) => {
    const upScore = ethers.BigNumber.from(idea.upScore);
    const score =
      idea.club.type === "0" ? formatEther(upScore.toString()) : upScore;
    return {
      id: idea.id,
      user: idea.user.id,
      score: parseFloat(score.toString()),
      message: idea.message,
      metadata: idea.metadata,
      commentsCount: parseFloat(idea.commentsCount),
      club: idea.club.id,
    };
  });
}
export function useIdea(address: string): IdeaInterface | undefined {
  const { data } = useSWR(QUERYGETIDEA(address), fetcher, {
    refreshInterval: 7000,
  });
  return data?.ideas?.map((idea: any) => {
    const upScore = ethers.BigNumber.from(idea.upScore);
    const score =
      idea.club.type === "0" ? formatEther(upScore.toString()) : upScore;
    return {
      id: idea.id,
      user: idea.user.id,
      score: parseFloat(score.toString()),
      message: idea.message,
      metadata: idea.metadata,
      commentsCount: parseFloat(idea.commentsCount),
      club: idea.club.id,
      comments: idea.comments.map((comment: any) => {
        return {
          id: comment.id,
          metadata: comment.metadata,
          user: comment.user.id,
        };
      }),
    };
  })[0];
}
