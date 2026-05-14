import { useEffect, type FC } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm action",
  description = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
}) => {
  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={loading ? undefined : onClose} // outside click
    >
      <div
        className="bg-white rounded-2xl w-96 p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} // prevent close inside
      >
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="
      w-full py-2 rounded-lg bg-gray-200
      cursor-pointer transition
      hover:bg-gray-300
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200
    "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="
      w-full py-2 rounded-lg bg-primary text-white
      flex items-center justify-center gap-2
      cursor-pointer transition
      hover:bg-primary-light
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-dark
    "
          >
            {loading && <span className="loading loading-spinner"></span>}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
