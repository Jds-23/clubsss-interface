import React from "react";
import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../../utils";
import Button from "../Button/Button";

const Header = () => {
  const { authenticate, isAuthenticated, user, account } = useMoralis();
  console.log(account);
  return (
    <div className="w-full px-4 fixed top-0 left-0 bg-black h-16 flex items-center">
      <div className="w-full flex items-center justify-between max-w-[1340px] m-auto">
        <img src="/img/clubsss.svg" className="w-28 object-contain" />
        <div>
          <Button
            onClick={() => {
              if (!isAuthenticated) {
                authenticate();
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
