import { FiAlertTriangle } from "react-icons/fi";

export const ErrorState = () => {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <div className="card bg-base-100 shadow-lg p-6 flex items-center justify-center">
        <FiAlertTriangle className="w-12 h-12 text-error opacity-80" />
      </div>
    </div>
  );
};
