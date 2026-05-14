import type { FC } from "react";
import { FaBookBookmark, FaTrophy, FaTag } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { EllipsisTypography } from "../../../common/components/EllipsisTypography";
import type { GetCourseModel } from "../../../common/models/getCourse.model";
import { scrollUpToTop } from "../../../common/utils/scrollUpToTop";

interface CourseCardProps {
  course: GetCourseModel;
  onRegister: () => void;
  onViewMore: () => void;
}

export const CourseCard: FC<CourseCardProps> = ({
  onRegister,
  onViewMore,
  course: {
    imageUrl,
    title,
    price,
    salePrice,
    currency,
    level,
    duration,
    type,
    isGroup,
  },
}) => {
  const handleClick = () => {
    scrollUpToTop();
    onViewMore?.();
  };

  const isOnSale = !!salePrice && salePrice < price;

  const discountPercent = isOnSale
    ? Math.round(((price - salePrice!) / price) * 100)
    : 0;

  return (
    <div className="card w-full bg-base-100 shadow-sm border border-gray-100 rounded-2xl overflow-hidden transition-all hover:shadow-md">
      {/* Image */}
      <figure className="relative h-52">
        <img src={imageUrl} alt={title} className="w-full h-full object-fill" />

        {/* SALE badge (top-right) */}
        {isOnSale && (
          <div className="absolute top-3 right-3 z-10">
            <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-md">
              <FaTag className="w-3 h-3" />-{discountPercent}%
            </span>
          </div>
        )}

        {/* PRICE badge (top-left) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col bg-primary text-white px-3 py-2 rounded-xl">
          {isOnSale ? (
            <>
              <span className="text-xs line-through text-gray-300">
                {price.toLocaleString()} {currency}
              </span>
              <span className="text-sm font-bold">
                {salePrice!.toLocaleString()} {currency}
              </span>
            </>
          ) : (
            <span className="text-sm font-bold">
              {price.toLocaleString()} {currency}
            </span>
          )}
        </div>
      </figure>

      {/* Content */}
      <div className="card-body px-6">
        <EllipsisTypography className="text-xl font-bold leading-tight min-h-14 mb-2">
          {title} | {level}
        </EllipsisTypography>

        {/* DETAILS */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <FaBookBookmark className="w-6 h-6" />
            <span className="font-medium text-gray-700">
              Տևողությունը:
            </span>{" "}
            {duration} Ամիս
          </div>

          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <IoPerson className="w-6 h-6" />
            <span className="font-medium text-gray-700">Տեսակը:</span>
            {type}
          </div>

          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <FaTrophy className="w-6 h-6" />
            <span className="font-medium text-gray-700">
              {isGroup ? "Խմբային" : "Անհատական"}
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="card-actions flex items-center justify-between mt-2">
          <button
            onClick={onRegister}
            className="btn bg-secondary hover:bg-[#142421] text-white border-none px-6 normal-case rounded-full"
          >
            Գրանցվիր Հիմա
            <IoIosArrowForward />
          </button>

          <button
            onClick={handleClick}
            className="btn btn-link text-gray-500 hover:text-black font-medium text-sm normal-case"
          >
            Տեսնել Ավելին
          </button>
        </div>
      </div>
    </div>
  );
};
