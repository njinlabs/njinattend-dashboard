import { Fragment, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { ModalParams } from "./use-modal";

export default function Modal({
  children,
  title,
  control,
  onClose = () => {},
}: ModalParams) {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (!control.isOpen && mount) {
      onClose();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [control.isOpen]);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <Fragment>
      {control.isOpen && (
        <div className="fixed z-30 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"></div>
      )}
      <div
        className={
          "fixed z-30 top-0 left-0 w-full h-screen overflow-auto flex items-start justify-center p-5 lg:py-16 transition duration-500 transform " +
          (control.isOpen ? "translate-y-0" : "-translate-y-full")
        }
      >
        <div className="bg-white rounded w-full lg:w-1/2 border relative">
          <div className="h-16 lg:h-20 flex items-center border-b border-gray-300">
            <div className="flex-1 font-bold text-lg p-5 lg:p-8 font-montserrat text-gray-700">
              {title}
            </div>
            <button
              type="button"
              onClick={() => {
                control.close();
              }}
              className="p-5 lg:p-8 text-gray-500"
            >
              <FaTimes />
            </button>
          </div>
          <div className="p-5 lg:p-8">{children}</div>
        </div>
      </div>
    </Fragment>
  );
}
