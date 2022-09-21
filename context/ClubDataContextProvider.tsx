import React, { createContext, useContext, useReducer, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import { ClubInterface, useClubs } from "../hooks/useClubs";

export const ClubDataContext = createContext<{
  metadataArr: { [x: string]: any };
  setMetadataArr: (arg: { [x: string]: any }) => void;
  clubs: ClubInterface[];
}>({
  metadataArr: {},
  setMetadataArr: (arg: { [x: string]: any }) => null,
  clubs: [],
});
let obj: { [x: string]: any } = {};

export const CreateAClubContextProvider: React.FC<{
  children: React.ReactChild;
}> = ({ children }) => {
  const [metadataArr, setMetadataArr] = useState<{ [x: string]: any }>({});
  const clubs = useClubs();

  const aNiceFunction = async (clubs: ClubInterface[]) => {
    clubs.map((club) => {
      const metadataUrl = club.metadata;
      fetch(metadataUrl)
        .then((res) => res.json())
        .then((res) => {
          obj = { ...obj, [club.id]: res };
          setMetadataArr(obj);
        })
        .catch((err) => {});
    });
  };

  useDeepCompareEffect(() => {
    aNiceFunction(clubs ?? []);
  }, [clubs]);

  return (
    <ClubDataContext.Provider value={{ metadataArr, setMetadataArr, clubs }}>
      {children}
    </ClubDataContext.Provider>
  );
};

export const useClubData = () => useContext(ClubDataContext);
