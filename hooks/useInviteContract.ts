import React, { useCallback, useEffect } from "react";
import { useWeb3Contract, useWeb3ExecuteFunction } from "react-moralis";
import InviteOnlyClubContractAbi from "../constants/abis/InviteOnlyClubContract.json";
import useToast from "./useToast";

const useInviteContract = (
  address: string | undefined,
  account: string | undefined
) => {
  const { runContractFunction, data, error, isLoading, isFetching } =
    useWeb3Contract({
      contractAddress: address,
      functionName: "invites",
      abi: InviteOnlyClubContractAbi,
      params: { "": account ?? "" },
    });
  useEffect(() => {
    runContractFunction();
  }, [runContractFunction]);
  const contractProcessor = useWeb3ExecuteFunction();
  const { txSuccess, txWaiting, error: errorToast } = useToast();

  const invite = useCallback(
    async (_invitee: string) => {
      let options = {
        contractAddress: address,
        functionName: "invite",
        abi: InviteOnlyClubContractAbi,
        params: {
          _invitee,
        },
      };
      await contractProcessor.fetch({
        params: options,
        onSuccess: () => {
          txSuccess("Invited", "");
        },
        onError: (error) => {
          errorToast("Error");
          console.log(error);
        },
      });
    },
    [contractProcessor, address]
  );

  return { invites: data, invite };
};

export default useInviteContract;
