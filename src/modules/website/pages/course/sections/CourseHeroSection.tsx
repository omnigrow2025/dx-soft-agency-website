import React from "react";
import { IoMdPeople, IoMdPerson, IoMdTime } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { EllipsisTypography } from "../../../../../common/components/EllipsisTypography";
import type { GetCourseModel } from "../../../../../common/models/getCourse.model";
import type { GetTeacherModel } from "../../../../../common/models/getTeacher.model";

interface CourseDetailProps {
  course: GetCourseModel;
  teacher: GetTeacherModel;
}

export const CourseHeroSection: React.FC<CourseDetailProps> = ({
  course,
  teacher,
}) => {
  return (
    <section>
      <div
        className="pt-10 pb-20   px-6 overflow-hidden"
        style={{
          backgroundImage: `url(${course.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side: Course Info */}
          <div className="lg:col-span-8">
            <nav className="text-white text-sm mb-6">
              <EllipsisTypography>
                <Link to="/" className="hover:underline">
                  Գլխավոր <MdKeyboardArrowRight className="inline" />
                </Link>
                {course.title}
                <MdKeyboardArrowRight className="inline" /> {course.level}
              </EllipsisTypography>
            </nav>

            <h1 className="text-white text-4xl md:text-5xl font-black mb-4 leading-tight">
              {course.title}
            </h1>
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-8 opacity-90">
              {course.level}
            </h2>

            <div className="text-white">{course.description}</div>

            {/* Metadata Badges */}
            <div className="mt-4 flex flex-wrap gap-8 text-white/80 text-sm font-medium">
              <div className="flex items-center gap-2">
                <IoMdPerson className=" text-lg" />
                <span>
                  Դասընթացավար :{" "}
                  {teacher ? `${teacher.name} ${teacher.lastName}` : "—"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IoMdPeople className=" text-lg" />
                <span>{course.isGroup ? "Խմբային" : "Անհատական"}</span>
              </div>
              <div className="flex items-center gap-2">
                <IoMdTime className=" text-lg" />
                <span>Տևողությունը: {course.duration} ամիս</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
