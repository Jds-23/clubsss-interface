import React, { createContext, useContext, useReducer, useState } from "react";

export const ModalContext = createContext<{
  open: boolean;
  setOpen: (arg: boolean) => void;
  setApperanceOpen: (arg: boolean) => void;
  setOptionsDropdown: (arg: boolean) => void;
  setOptionSelected: (arg: number) => void;
  setClubName: (arg: string) => void;
  setAbout: (arg: string) => void;
  setAddress: (arg: string) => void;
  setInvites: (arg: string) => void;
  setMetadatauri: (arg: string | undefined) => void;
  setCover: (arg: string | undefined) => void;
  setDisplay: (arg: string | undefined) => void;
  optionsDropdown: boolean;
  apperanceOpen: boolean;
  optionSelected: number | undefined;
  clubName: string;
  about: string;
  address: string;
  invites: string;
  metadatauri: string | undefined;
  cover: string | undefined;
  display: string | undefined;
}>({
  open: false,
  apperanceOpen: false,
  setOpen: (arg: boolean) => null,
  setApperanceOpen: (arg: boolean) => null,
  setOptionsDropdown: (arg: boolean) => null,
  setOptionSelected: (arg: number) => null,
  setClubName: (arg: string) => null,
  setAbout: (arg: string) => null,
  setAddress: (arg: string) => null,
  setInvites: (arg: string) => null,
  setMetadatauri: (arg: string | undefined) => null,
  setCover: (arg: string | undefined) => null,
  setDisplay: (arg: string | undefined) => null,
  optionsDropdown: false,
  optionSelected: undefined,
  clubName: "",
  about: "",
  address: "",
  invites: "3",
  metadatauri: undefined,
  cover: undefined,
  display: undefined,
});

export const CreateAClubContextProvider: React.FC<{
  children: React.ReactChild;
}> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [optionsDropdown, setOptionsDropdown] = useState(false);
  const [optionSelected, setOptionSelected] = useState<number>();
  const [clubName, setClubName] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [invites, setInvites] = useState("3");
  const [metadatauri, setMetadatauri] = useState<string>();
  const [apperanceOpen, setApperanceOpen] = useState(false);
  const [cover, setCover] = useState<string>();

  const [display, setDisplay] = useState<string>();

  return (
    <ModalContext.Provider
      value={{
        open,
        setOpen,
        optionsDropdown,
        optionSelected,
        clubName,
        cover,
        display,
        about,
        address,
        invites,
        metadatauri,
        apperanceOpen,
        setOptionsDropdown,
        setOptionSelected,
        setApperanceOpen,
        setClubName,
        setAbout,
        setAddress,
        setInvites,
        setMetadatauri,
        setCover,
        setDisplay,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useCreateAClubModal = () => useContext(ModalContext);
