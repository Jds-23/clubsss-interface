import { useCallback } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import ClubContractAbi from "../constants/abis/ClubContract.json";
import useToast from "./useToast";

const useVote = ({ address, index }: { address: string; index: string }) => {
  const { txSuccess, txWaiting, error: errorToast } = useToast();
  const contractProcessor = useWeb3ExecuteFunction();

  const vote = useCallback(async () => {
    let options = {
      contractAddress: address,
      functionName: "vote",
      abi: ClubContractAbi,
      params: {
        _index: index,
        _type: 0,
      },
    };
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        txSuccess("Voted Idea", "");
      },
      onError: (error) => {
        errorToast("Error");
        console.log(error);
      },
    });
  }, [contractProcessor, address, index]);

  return {
    vote,
  };
};

export default useVote;
