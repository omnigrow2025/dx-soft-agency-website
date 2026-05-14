import React from "react";
import { EllipsisTypography } from "../../../common/components/EllipsisTypography";
import { PiMoneyWavy } from "react-icons/pi";
import { MdArrowRightAlt } from "react-icons/md";

interface CourseCardProps {
  features: string[];
  onRegister: () => void;
  price: number;
  salePrice: number | null;
  currency: string;
}

export const CourseFeaturesCard: React.FC<CourseCardProps> = ({
  features,
  price,
  salePrice,
  currency,
  onRegister,
}) => {
  const isOnSale = salePrice != null && salePrice < price && salePrice > 0;

  return (
    <div className="bg-white p-4 gap-4 flex md:flex-row flex-col justify-evenly rounded-lg shadow-md w-full space-y-1 relative -top-15">
      <div>
        <h3 className="text-lg font-semibold mb-1">Կուրսը ներառում է՝</h3>
        <ul className="space-y-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 max-w-80">
              <span className="w-1 h-1 bg-black rounded-full shrink-0" />
              <EllipsisTypography className="text-md">
                {feature}
              </EllipsisTypography>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2 flex flex-col justify-center items-center">
        <div className="flex justify-center gap-2 text-gray-700 font-medium text-sm">
          <PiMoneyWavy className="w-5 h-5" />

          <div className="mb-4">
            {isOnSale && salePrice != null ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-400 line-through text-sm">
                  {price.toLocaleString()} {currency}
                </span>

                <span className="text-lg font-bold text-primary">
                  {salePrice.toLocaleString()} {currency}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-primary">
                {price.toLocaleString()} {currency}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={onRegister}
          className="btn bg-secondary btn-md text-white border-none px-6 py-2 flex items-center gap-2 rounded-full"
        >
          Գրանցվիր Հիմա
          <MdArrowRightAlt className="text-2xl" />
        </button>
      </div>
    </div>
  );
};
