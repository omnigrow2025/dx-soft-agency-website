import { GoClock } from "react-icons/go";
import { PiFilesLight } from "react-icons/pi";
import { EllipsisTypography } from "../../../../../common/components/EllipsisTypography";
import { Tab } from "../../../../../common/components/UI/Tab";
import { Tabs } from "../../../../../common/components/UI/Tabs";
import { IMAGE_SRC } from "../../../../../common/constants/constants";
import type { GetTeacherModel } from "../../../../../common/models/getTeacher.model";

interface CourseProps {
  data: {
    teacher: GetTeacherModel;
    practice: string;
    certification: string;
    features: string[];
    format: string;
    stats: {
      durationMonths: number;
      lessonDuration: number;
    };
    studyPlan: {
      title: string;
      description: string;
    }[];
  };
}

export const CourseDetailsTabs = ({ data }: CourseProps) => {
  return (
    <div className="max-w-5xl mx-auto px-6   bg-white">
      <Tabs>
        <Tab
          label="Դասընթացավար"
          component={
            <div className="space-y-6">
              <h4 className="text-xl text-black">
                <PiFilesLight className="inline" />{" "}
                <span className="font-bold">{data.teacher.name}</span>{" "}
                {data.teacher.lastName}
              </h4>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 max-w-70">
                  <div className="bg-[#F8F9FA] rounded-2xl p-4 shadow-sm border border-gray-100">
                    <img
                      src={`${IMAGE_SRC}${data.teacher.imageUrl}`}
                      alt={data.teacher.name}
                      className="w-full aspect-4/5 object-cover rounded-xl mb-4"
                    />
                    <h3 className="font-bold text-[#1F3530]">
                      {`${data.teacher.name} ${data.teacher.lastName}`}
                    </h3>
                    <EllipsisTypography className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                      {data.teacher.bio}
                    </EllipsisTypography>
                  </div>
                </div>

                <div className="lg:col-span-8 text-gray-700 leading-relaxed">
                  {data.teacher.description}
                </div>
              </div>
            </div>
          }
        />

        <Tab
          label="Պրակտիկա"
          component={<div className="text-gray-600">{data.practice}</div>}
        />

        <Tab
          label="Սերտիֆիկացում"
          component={<div className="text-gray-600">{data.certification}</div>}
        />

        <Tab
          label="Ուսումնական պլան"
          component={
            <>
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <PiFilesLight />
                  <span>{data.stats.durationMonths} ամսյա տեսական</span>
                </div>

                <span className="text-gray-300">|</span>

                <div className="flex items-center gap-2">
                  <GoClock />
                  <span>{data.format} ձևաչափ</span>
                </div>
              </div>
              <div>
                {data.studyPlan.map((faq, index) => (
                  <div
                    key={index}
                    className="collapse collapse-arrow bg-[#F8F9FA] border border-transparent hover:border-gray-200 transition-all rounded-none!"
                  >
                    <input type="checkbox" name="faq-accordion" />

                    <div className="collapse-title flex items-center gap-4 py-4 pr-12 rounded-none!">
                      <span className="text-[#1F3530] text-sm md:text-base leading-tight">
                        {faq.title}
                      </span>
                    </div>

                    <div className="collapse-content bg-white rounded-none!">
                      <p className="text-primary text-sm leading-relaxed">
                        {faq.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          }
        />
      </Tabs>
    </div>
  );
};
