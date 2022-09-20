import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Button from "../Button/Button";

interface MyModalInterface {
  setOpen: (arg: boolean) => void;
  open: boolean;
  title: string;
  size?: "md" | "lg";
}
const Modal: React.FC<
  React.HTMLAttributes<HTMLDivElement> & MyModalInterface
> = ({ setOpen, open, title, size = "md", children }) => {
  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full ${
                    size === "lg" ? "max-w-2xl" : "max-w-md"
                  } transform rounded-lg bg-white text-left align-middle shadow-xl transition-all`}
                >
                  <Dialog.Title
                    as="div"
                    className="flex justify-between rounded-t-lg bg-black p-6 text-white text-left text-2xl font-bold leading-6 text-gray-900"
                  >
                    <h1>{title}</h1>
                    <button onClick={closeModal}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </Dialog.Title>
                  <div className="mt-2">
                    {children}
                    {/* <Button className="mt-1" block onClick={closeModal}>
                      Close
                    </Button> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default Modal;
