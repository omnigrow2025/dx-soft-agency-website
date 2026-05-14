import type { FC } from "react";
import type { FeatureModel } from "../../../../../../../common/models/getCourse.model";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  features: FeatureModel[];
}

export const FeaturesModal: FC<Props> = ({ isOpen, onClose, features }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-100 p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Course Features</h2>

        <ul className="space-y-2 max-h-75 overflow-y-auto">
          {features.map((feature, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded-lg text-sm">
              ✔ {feature.title}
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="mt-5 w-full bg-gray-800 text-white py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};
