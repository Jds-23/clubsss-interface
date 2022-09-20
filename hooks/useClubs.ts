import useSWR from "swr";
import { clubv1subgraph } from "../constants";
import { request } from "graphql-request";
import { ethers } from "ethers";
import { useCallback, useState } from "react";

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
  const { data } = useSWR(QUERY, fetcher, { refreshInterval: 1000 });
  return data?.clubs?.map((club: any) => {
    const decodedData = ethers.utils.defaultAbiCoder.decode(
      ["address", "string", "string"],
      club.data
    );
    console.log(decodedData);
    return {
      id: club.id,
      type: parseFloat(club.type),
      ideasCount: parseFloat(club.ideasCount),
      data: club.data,
      clubName: decodedData[1],
      metadata: decodedData[2],
    };
  });
}
