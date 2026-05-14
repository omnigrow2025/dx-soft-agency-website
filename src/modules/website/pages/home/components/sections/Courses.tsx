import { useMemo, useState, type FC } from "react";
import { RiFilterFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IMAGE_SRC } from "../../../../../../common/constants/constants";
import type { GetCourseModel } from "../../../../../../common/models/getCourse.model";
import { CourseCard } from "../../../../components/CourseCard";
import { RegistrationModal } from "../../../../components/RegistrationModal";
import { useWebsiteData } from "../../../../hooks/useWebsiteData";

export const Courses: FC = () => {
  const { data } = useWebsiteData();

  const navigate = useNavigate();

  const [openRegisterModal, setOpenRegisterModal] =
    useState<GetCourseModel | null>(null);
  const [activeTab, setActiveTab] = useState<number | "all">("all");

  const allCourses = useMemo(
    () => data?.categories.flatMap((item) => item.courses),
    [data?.categories],
  );

  const courses = useMemo(() => {
    if (activeTab === "all") return allCourses;
    return data?.categories.find((el) => el.id === activeTab)?.courses ?? [];
  }, [activeTab, allCourses, data?.categories]);

  const handleTabClick = (id: number | "all") => setActiveTab(id);

  const handleCloseRegisterModal = () => {
    setOpenRegisterModal(null);
  };

  const handleOpenRegisterModal = (data: GetCourseModel) => {
    setOpenRegisterModal(data);
  };

  return (
    <>
      <div
        id="courses"
        className="flex flex-col md:flex-row justify-between items-center w-full py-6 px-4 gap-4"
      >
        {/* Title */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-primary rounded-full"></div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-gray-800">
            ՀԱՍԱՆԵԼԻ ԴԱՍԸՆԹԱՑՆԵՐ
          </h2>
        </div>

        {/* Tabs */}
        <div className="overflow-x-auto no-scrollbar w-full md:w-auto">
          <div className="flex gap-2 min-w-max items-center px-2">
            <button
              onClick={() => handleTabClick("all")}
              className={`px-6 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${
                activeTab === "all"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Բոլորը
            </button>

            {data?.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleTabClick(category.id)}
                className={`px-6 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${
                  activeTab === category.id
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-500"
                }`}
              >
                {category.name}
              </button>
            ))}

            <button className="btn btn-ghost btn-square shrink-0 bg-gray-100/50 ml-2">
              <RiFilterFill />
            </button>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
        {courses?.map((el) => (
          <CourseCard
            key={el.id}
            course={{
              ...el,
              imageUrl: `${IMAGE_SRC}${el.imageUrl}`,
            }}
            onRegister={() => handleOpenRegisterModal(el)}
            onViewMore={() => navigate(`course/${el.id}`)}
          />
        ))}
      </div>

      {openRegisterModal && (
        <RegistrationModal
          course={openRegisterModal}
          isOpen={!!openRegisterModal}
          onClose={handleCloseRegisterModal}
        />
      )}
    </>
  );
};
