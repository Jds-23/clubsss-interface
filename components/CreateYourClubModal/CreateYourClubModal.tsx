import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

const options = [
  { type: "NFT Module", more: "Holders of NFT Collection" },
  { type: "Tokens Module", more: "Holders of ERC20 Token" },
  { type: "Invite Only Module", more: "Invite only club" },
];
const inputNeeded = [
  "NFT Contract Address",
  "Token Contract Address",
  undefined,
];

const CreateYourClubModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [optionsDropdown, setOptionsDropdown] = useState(false);
  const [optionSelected, setOptionSelected] = useState<number>();
  const [clubName, setClubName] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [invites, setInvites] = useState("3");

  const [apperanceOpen, setApperanceOpen] = useState(false);

  const coverInput = useRef<any>(null);
  const [cover, setCover] = useState("");

  const displayInput = useRef<any>(null);
  const [display, setDisplay] = useState("");

  return (
    <>
      <Modal
        size="lg"
        open={apperanceOpen}
        setOpen={setApperanceOpen}
        title="Set Apperance"
      >
        <div className="p-5 w-full">
          <div className="w-full border-2 border-lightGray bg-orange-100 h-24 rounded-lg grid place-items-center">
            <button
              onClick={() => {
                if (coverInput) {
                  coverInput.current.click();
                }
              }}
              className="text-[10px] underline"
            >
              Select Cover{" "}
            </button>
            <input
              ref={coverInput}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(evt) => {
                evt.preventDefault();
                // uploadfile(evt.target.files);
              }}
              disabled={!!cover}
            />
          </div>
          <div className="flex items-center">
            <div className="w-24 ml-4 -mt-4 border-2 border-lightGray bg-orange-100 h-24  rounded-lg grid place-items-center">
              <button
                onClick={() => {
                  if (displayInput) {
                    displayInput.current.click();
                  }
                }}
                className="text-[10px] underline"
              >
                Select Display{" "}
              </button>
              <input
                ref={displayInput}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(evt) => {
                  evt.preventDefault();
                  // uploadfile(evt.target.files);
                }}
                disabled={!!display}
              />
            </div>
            <input
              value={clubName}
              className="ml-4 outline-none font-bold text-lg"
              placeholder="Club's Name"
              onChange={(e) => setClubName(e.target.value)}
            />
          </div>
          <textarea
            value={about}
            className="ml-4 mt-2 outline-none w-full"
            placeholder="About Your Club (simple markdown supported, links)"
            onChange={(e) => setAbout(e.target.value)}
          />
          <button
            onClick={() => setApperanceOpen(false)}
            className="w-full mt-4 underline text-sm text-blue-600 decoration-blue-600"
          >
            Cancel
          </button>
          <Button block className="mt-2">
            Save
          </Button>
        </div>
      </Modal>
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
                      clip-rule="evenodd"
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
          <Button block className="mt-2">
            Create your club
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CreateYourClubModal;
