import { IoMdPhotos } from "react-icons/io";
import { useId } from "react";

type ImageModalProps = {
  imageUrl: string;
};

export const ImageModal = ({ imageUrl }: ImageModalProps) => {
  const id = useId();
  return (
    <>
      {/* Open modal button */}
      <label htmlFor={id} className="btn btn-ghost">
        <IoMdPhotos />
      </label>

      {/* Hidden checkbox */}
      <input type="checkbox" id={id} className="modal-toggle" />

      <div className="modal">
        {/* Modal box (optional: empty or content inside) */}
        <div className="modal-box relative z-20 p-0">
          <img
            src={imageUrl}
            alt="Modal"
            className="w-full h-auto object-contain rounded"
          />
        </div>

        {/* Backdrop: clicking closes modal */}
        <label htmlFor={id} className="modal-backdrop bg-black/50"></label>
      </div>
    </>
  );
};
