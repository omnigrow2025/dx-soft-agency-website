import type { FC } from "react";
import type { StudyPlanModel } from "../../../../../../../common/models/getCourse.model";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  studyPlan: StudyPlanModel[];
}

export const StudyPlanModal: FC<Props> = ({ isOpen, onClose, studyPlan }) => {
  if (!isOpen) return null;

  const sortedPlan = [...studyPlan].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-125 p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Study Plan</h2>

        <div className="space-y-3 max-h-100 overflow-y-auto">
          {sortedPlan.map((item, index) => (
            <div key={index} className="p-3 bg-gray-100 rounded-xl">
              <h3 className="font-semibold">
                {item.order ?? index + 1}. {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

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
