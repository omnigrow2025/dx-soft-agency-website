import React from "react";
import { PiMoneyWavy } from "react-icons/pi";
import { MdArrowRightAlt } from "react-icons/md";
import { EllipsisTypography } from "../../../../../common/components/EllipsisTypography";

interface CourseFeaturesContainerProps {
  features: string[];
  price: number;
  currency: string;
  onRegister: () => void;
}

export const CourseFeaturesContainer: React.FC<
  CourseFeaturesContainerProps
> = ({ features, price, currency, onRegister }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full space-y-6 border border-gray-100">
      {/* Header */}
      <div>
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-800">
          Կուրսը ներառում է՝
        </h3>
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li
              key={i}
              className="flex items-start gap-3 group hover:bg-gray-50 p-2 rounded-md transition"
            >
              <span className="w-2 h-2 mt-1 bg-primary rounded-full shrink-0" />
              <EllipsisTypography className="text-sm md:text-base text-gray-700 group-hover:text-gray-900">
                {feature}
              </EllipsisTypography>
            </li>
          ))}
        </ul>
      </div>

      {/* Price & Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm md:text-base">
          <PiMoneyWavy className="w-5 h-5 text-primary" />
          <span>Արժեքը:</span>
          <span className="font-bold text-lg md:text-xl text-gray-900">
            {price.toLocaleString()} {currency}
          </span>
        </div>

        <button
          onClick={onRegister}
          className="btn btn-secondary text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow-md transition"
        >
          Գրանցվիր Հիմա
          <MdArrowRightAlt className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
