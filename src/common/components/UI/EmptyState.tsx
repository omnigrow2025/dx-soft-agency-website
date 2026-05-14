import { FiInbox } from "react-icons/fi";

export const EmptyState = () => {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <div className="p-4 rounded-full bg-base-200">
        <FiInbox className="w-12 h-12 text-base-content/40" />
      </div>
    </div>
  );
};
