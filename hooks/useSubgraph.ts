import useSWR from "swr";
import { clubv1subgraph } from "../constants";
import { request } from "graphql-request";

const QUERY = `{
    clubs(first: 5) {
        id
        type
        data
        ideas {
            id
        }
    }
}`;
// @ts-ignore
const fetcher = (query) => request(clubv1subgraph, query);

export function useSubgraph(){
    const { data } = useSWR(QUERY, fetcher, { refreshInterval: 1000 });
    return data
}