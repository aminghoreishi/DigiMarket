import { IoMdClose } from "react-icons/io";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  acceptLabel?: string;
  declineLabel?: string;
  onAccept?: () => void;
  isApproved?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title = "عنوان",
  children,
  acceptLabel = "I accept",
  declineLabel = "Decline",
  onAccept,
  isApproved = false,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      aria-hidden="true"
      dir="rtl"
      className=" overflow-y-auto font-danaMed overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div onClick={onClose} className="bg-black/60 fixed inset-0"></div>
      <div className="relative  p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white border border-default rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
            <h3 className="text-lg font-medium text-heading">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-body bg-transparent cursor-pointer hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
              data-modal-hide="static-modal"
            >
              <IoMdClose className="w-5 h-5" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="space-y-4 md:space-y-6 py-4 md:py-6">{children}</div>
          <div className="flex items-center border-t border-default space-x-4 pt-4 md:pt-5">
            <button
              data-modal-hide="static-modal"
              type="button"
              disabled={isApproved}
              onClick={onAccept}
              className=" bg-blue-500  disabled:cursor-not-allowed disabled:opacity-60 text-white rounded-xl cursor-pointer transition-all hover:bg-blue-600 bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              {acceptLabel}
            </button>
            <button
              data-modal-hide="static-modal"
              type="button"
              onClick={onAccept}
              disabled={!isApproved}
              className="text-body disabled:cursor-not-allowed bg-red-500 disabled:opacity-60 text-white rounded-xl cursor-pointer bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              {declineLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
