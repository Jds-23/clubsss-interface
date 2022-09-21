import Link from "next/link";
import React from "react";
import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../../utils";
import Button from "../Button/Button";
import { useChain } from "react-moralis";

const Header = () => {
  const { authenticate, isAuthenticated, user, account, enableWeb3 } =
    useMoralis();
  const { switchNetwork, chainId, chain } = useChain();
  return (
    <div className="w-full z-10 px-4 fixed top-0 left-0 bg-black h-16 flex items-center">
      <div className="w-full flex items-center justify-between max-w-[1340px] m-auto">
        <Link href={"/"}>
          <img src="/img/clubsss.svg" className="w-28 object-contain" />
        </Link>
        <div className="flex items-center">
          {account && (
            <>
              {chainId !== "0x13881" && (
                <Button
                  className="mr-2 bg-white border-red-500 text-red-500 hover:bg-white"
                  onClick={() => {
                    switchNetwork("0x13881");
                  }}
                >
                  Switch To Mumbai
                </Button>
              )}
            </>
          )}
          <Button
            onClick={() => {
              if (!isAuthenticated) {
                authenticate();
              } else {
                enableWeb3();
              }
            }}
          >
            {!account ? "Connect Wallet" : getEllipsisTxt(account)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
