import React, { useCallback } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import { useCreateAClubModal } from "../../context/CreateAClubContextProvider";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import SetClubApperanceModal from "./SetClubApperanceModal";
import ClubFactoryAbi from "../../constants/abis/ClubFactory.json";
import { ClubFactoryAddress } from "../../constants";
import useToast from "../../hooks/useToast";
import { ethers } from "ethers";
const options = [
  { type: "Tokens Module", more: "Holders of ERC20 Token" },
  { type: "NFT Module", more: "Holders of NFT Collection" },
  { type: "Free", more: "Anyone Can Join" },
  { type: "Invite Only Module", more: "Invite only club" },
];
const inputNeeded = [
  "NFT Contract Address",
  "Token Contract Address",
  undefined,
  undefined,
];

const CreateYourClubModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (arg: boolean) => void;
}) => {
  const { txSuccess, txWaiting, error: errorToast } = useToast();
  const contractProcessor = useWeb3ExecuteFunction();
  const {
    clubName,
    metadatauri,
    setClubName,
    setOptionsDropdown,
    optionsDropdown,
    optionSelected,
    setOptionSelected,
    address,
    setAddress,
    invites,
    setInvites,
    setApperanceOpen,
  } = useCreateAClubModal();

  const deployClub = useCallback(async () => {
    if (optionSelected === undefined || !metadatauri || clubName.length < 3)
      return;
    const data = await ethers.utils.defaultAbiCoder.encode(
      ["address", "string", "string"],
      [address, clubName, metadatauri]
    );
    let options = {
      contractAddress: ClubFactoryAddress,
      functionName: "deployClub",
      abi: ClubFactoryAbi,
      params: {
        index: optionSelected,
        _data: data,
      },
    };
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        txSuccess("Club Created", "");
      },
      onError: (error) => {
        errorToast("Error");
        console.log(error);
      },
    });
  }, [contractProcessor, optionSelected, address, clubName, metadatauri]);

  return (
    <>
      <SetClubApperanceModal />
      <Modal title="Create your Club" open={open} setOpen={setOpen}>
        <div className="p-3">
          <div>
            <label className="font-bold mt-1">Club’s Name</label>
            <input
              className="text-xs mb-2 w-full active:outline-primary focus:outline-primary px-4 py-3 rounded-md bg-[#f8f8f8] border border-lightGray"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              placeholder="FC Barcelona Fans"
            />
          </div>
          <div>
            <label className="font-bold mt-1">Club's Membership Module</label>
            <div className="relative mt-1">
              <button
                type="button"
                onClick={() => setOptionsDropdown(!optionsDropdown)}
                className="relative mb-2 w-full cursor-pointer rounded-md bg-[#f8f8f8] border border-lightGray py-2 pl-3 pr-10 text-left shadow-sm focus:outline-primary sm:text-sm"
              >
                <span className="flex items-center">
                  <span className="ml-3 block truncate font-bold">
                    {optionSelected !== undefined
                      ? options[optionSelected].type
                      : "Select"}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
              {optionsDropdown && (
                <ul
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white pt-0 p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  role="listbox"
                >
                  {options.map(({ more, type }, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer rounded ${
                        optionSelected === index
                          ? "bg-orange-200"
                          : "hover:bg-orange-100 bg-lightGray"
                      }  mt-1 relative select-none py-1 pl-1.5`}
                      id="listbox-option-0"
                      role="option"
                      onClick={() => {
                        setOptionsDropdown(false);
                        setOptionSelected(index);
                      }}
                    >
                      <div className="">
                        <span className="font-bold ml-0.5 block truncate">
                          {type}
                        </span>
                        <span className="text-xs opacity-50 ml-0.5 block truncate">
                          {more}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* <input
        className="text-xs mb-2 w-full active:outline-primary focus:outline-primary px-4 py-3 rounded-md bg-[#f8f8f8] border border-lightGray"
        value={""}
        placeholder="Options"
      /> */}
          </div>
          {optionSelected !== undefined && (
            <>
              {inputNeeded[optionSelected] && (
                <div>
                  <label className="font-bold mt-1">
                    {inputNeeded[optionSelected]}
                  </label>
                  <input
                    className="text-xs mb-2 w-full active:outline-primary focus:outline-primary px-4 py-3 rounded-md bg-[#f8f8f8] border border-lightGray"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={inputNeeded[optionSelected]}
                  />
                </div>
              )}
            </>
          )}
          {optionSelected === 2 && (
            <div>
              <label className="font-bold mt-1">
                Number Of Invites per Member
              </label>
              <input
                className="text-xs mb-2 w-full active:outline-primary focus:outline-primary px-4 py-3 rounded-md bg-[#f8f8f8] border border-lightGray"
                value={invites}
                onChange={(e) => setInvites(e.target.value)}
              />
            </div>
          )}
          <button
            onClick={() => setApperanceOpen(true)}
            className="w-full mt-4 underline text-sm text-blue-600 decoration-blue-600"
          >
            Set Apprerances
          </button>
          <Button onClick={() => deployClub()} block className="mt-2">
            Create your club
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CreateYourClubModal;
