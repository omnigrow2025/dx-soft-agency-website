import type { FC } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { TbArrowBounce } from "react-icons/tb";
import { HashLink } from "react-router-hash-link";
import { EllipsisTypography } from "../../../../common/components/EllipsisTypography";
import { Typography } from "../../../../common/components/Typography";
import { useWebsiteData } from "../../hooks/useWebsiteData";
import { IMAGE_SRC } from "../../../../common/constants/constants";

export const TeamCarousel: FC = () => {
  const { data } = useWebsiteData();
  return (
    <div
      id="masters"
      className="flex flex-col lg:flex-row items-center gap-12 p-8 bg-white max-w-7xl mx-auto"
    >
      {/* Left Content Side */}
      <div className="lg:w-1/3 space-y-6 text-left">
        <Typography text="Մեր Թիմը" className="text-5xl" />

        <p className="text-gray-500 text-sm max-w-xs">
          Ստեղծում ենք կրթական լուծումներ՝ զարգացնելու ձեր հմտությունները և
          հաջողությունը:
        </p>

        <div className="relative pt-4">
          {/* Action Button */}
          <HashLink
            smooth
            to="/#courses"
            className="inline-flex w-fit bg-[#1F3530] hover:bg-[#142421] text-white border-none rounded-full px-4 py-2 normal-case items-center gap-2"
          >
            Դիտել դասընթացները
            <IoIosArrowForward />
          </HashLink>

          {/* Floating Curved Badge Label */}
          <div className="absolute -right-10 top-0 rotate-20 hidden xl:block">
            <div className="bg-[#F4F7FF] text-primary font-bold px-4 py-2 rounded-full text-sm shadow-sm border border-gray-50">
              Դասընթացավարներ
            </div>

            <TbArrowBounce
              className="w-12 h-12 text-primary -rotate-15 mt-4"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>

      {/* Right Side: DaisyUI Carousel */}
      <div className="lg:w-2/3 w-full">
        <div className="carousel carousel-center max-w-full p-4 space-x-6 bg-transparent rounded-box">
          {data?.teachers.map((teacher, index) => (
            <div key={index} className="carousel-item">
              <div className="card w-64 bg-[#F8F9FA] border border-gray-100 transition-all hover:shadow-lg rounded-2xl overflow-hidden">
                <figure className="px-3 pt-3">
                  <img
                    src={`${IMAGE_SRC}${teacher.imageUrl}`}
                    alt={teacher.name}
                    className="rounded-xl h-56 w-full object-cover"
                  />
                </figure>
                <div className="card-body p-5">
                  <h3 className="text-lg font-bold text-gray-800">
                    {teacher.name}{" "}
                    <span className="font-normal text-gray-500">
                      {teacher.lastName}
                    </span>
                  </h3>
                  <EllipsisTypography className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                    {teacher.bio}
                  </EllipsisTypography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
