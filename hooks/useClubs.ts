import useSWR from "swr";
import { clubv1subgraph } from "../constants";
import { request } from "graphql-request";
import { ethers } from "ethers";

interface ClubInterface {
  id: string;
  type: number;
  data: string;
  clubName: string;
  metadata: string;
  ideasCount: number;
}
const QUERY = `{
    clubs(first: 15) {
        id
        type
        data
        ideasCount
        ideas {
          id
        }
      }
}`;
// @ts-ignore
const fetcher = (query) => request(clubv1subgraph, query);

export function useClubs(): ClubInterface[] | undefined {
  const { data } = useSWR(QUERY, fetcher, { refreshInterval: 7000 });
  return data?.clubs?.map((club: any) => {
    let decodedData;
    if (club.type === "0" || club.type === "1")
      decodedData = ethers.utils.defaultAbiCoder.decode(
        ["address", "string", "string"],
        club.data
      );
    else if (club.type === "2")
      decodedData = ethers.utils.defaultAbiCoder.decode(
        ["string", "string"],
        club.data
      );
    else
      decodedData = ethers.utils.defaultAbiCoder.decode(
        ["uint256", "string", "string"],
        club.data
      );
    return {
      id: club.id,
      type: parseFloat(club.type),
      ideasCount: parseFloat(club.ideasCount),
      data: club.data,
      clubName: decodedData[decodedData.length - 2],
      metadata: decodedData[decodedData.length - 1],
    };
  });
}
export function useClub(id: string): ClubInterface {
  const { data } = useSWR(QUERY, fetcher, { refreshInterval: 7000 });
  return data?.clubs
    ?.filter((club: any) => club.id === id)
    ?.map((club: any) => {
      let decodedData;
      if (club.type === "0" || club.type === "1")
        decodedData = ethers.utils.defaultAbiCoder.decode(
          ["address", "string", "string"],
          club.data
        );
      else if (club.type === "2")
        decodedData = ethers.utils.defaultAbiCoder.decode(
          ["string", "string"],
          club.data
        );
      else
        decodedData = ethers.utils.defaultAbiCoder.decode(
          ["uint256", "string", "string"],
          club.data
        );

      return {
        id: club.id,
        type: parseFloat(club.type),
        ideasCount: parseFloat(club.ideasCount),
        data: club.data,
        clubName: decodedData[decodedData.length - 2],
        metadata: decodedData[decodedData.length - 1],
      };
    })[0];
}
