import React, { useCallback, useRef } from "react";
import { useMoralisFile } from "react-moralis";
import { useCreateAClubModal } from "../../context/CreateAClubContextProvider";
import useToast from "../../hooks/useToast";
import { jsonFile } from "../../utils";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

const SetClubApperanceModal = () => {
  const {
    cover,
    setCover,
    clubName,
    setClubName,
    display,
    setDisplay,
    about,
    setAbout,
    setMetadatauri,
    metadatauri,
    apperanceOpen,
    setApperanceOpen,
  } = useCreateAClubModal();
  const { saveFile } = useMoralisFile();
  const { txSuccess, txWaiting, error: errorToast } = useToast();

  const coverInput = useRef<any>(null);

  const displayInput = useRef<any>(null);

  const uploadcover = async (file: FileList | null) => {
    if (!file) return;
    if (!file[0]) return;
    const saveFileRes = await saveFile(file[0].name, file[0], {
      saveIPFS: true,
    });
    const Url = saveFileRes?.ipfs();
    setCover(Url);
  };
  const uploadisplay = async (file: FileList | null) => {
    if (!file) return;
    if (!file[0]) return;
    const saveFileRes = await saveFile(file[0].name, file[0], {
      saveIPFS: true,
    });
    const Url = saveFileRes?.ipfs();
    setDisplay(Url);
  };
  const save = useCallback(async () => {
    const file = jsonFile("metadata.json", { clubName, about, cover, display });
    const saveFileRes = await saveFile(file.name, file, { saveIPFS: true });
    const Url = saveFileRes?.ipfs();
    setMetadatauri(Url);
    txSuccess("Apperance Saved", "");
  }, [clubName, about, cover, display, setMetadatauri]);
  return (
    <Modal
      size="lg"
      open={apperanceOpen}
      setOpen={setApperanceOpen}
      title="Set Apperance"
    >
      <div className="p-5 w-full">
        <div className="w-full relative border-2 overflow-hidden border-lightGray bg-orange-100 h-24 rounded-lg grid place-items-center">
          {cover && (
            <img
              src={cover}
              className="w-full absolute top-0 left-0 bg-orange-100 object-contain rounded-lg "
            />
          )}
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
              uploadcover(evt.target.files);
            }}
            disabled={!!cover}
          />
        </div>
        <div className="flex relative items-center">
          <div className="w-24 ml-4 -mt-4 border-2 border-lightGray bg-orange-100 h-24  rounded-lg grid place-items-center">
            {display && (
              <img
                src={display}
                className="w-24 ml-4 -mt-4  absolute top-0 left-0 bg-orange-100 object-contain rounded-lg "
              />
            )}
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
                uploadisplay(evt.target.files);
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
        <Button onClick={() => save()} block className="mt-2">
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default SetClubApperanceModal;
