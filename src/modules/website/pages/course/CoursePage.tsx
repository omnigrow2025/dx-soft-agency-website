import { useState, type FC } from "react";
import { useParams } from "react-router-dom";
import { IMAGE_SRC } from "../../../../common/constants/constants";
import type { GetTeacherModel } from "../../../../common/models/getTeacher.model";
import { CourseFeaturesCard } from "../../components/CourseFeaturesCard";
import { RegistrationModal } from "../../components/RegistrationModal";
import { CourseDetailsTabs } from "./sections/CourseDetailsTabs";
import { CourseHeroSection } from "./sections/CourseHeroSection";
import { useWebsiteData } from "../../hooks/useWebsiteData";

export const CoursePage: FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { data } = useWebsiteData();

  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  // Find course in context
  const course = data?.categories
    .flatMap((cat) => cat.courses)
    .find((c) => c.id === courseId);

  // Find teacher in context
  const teacher = data?.teachers.find((t) => t.id === course?.teacherId);

  const handleCloseRegisterModal = () => setOpenRegisterModal(false);
  const handleOpenRegisterModal = () => setOpenRegisterModal(true);

  if (!course || !teacher) return null;

  return (
    <>
      <CourseHeroSection
        course={{ ...course, imageUrl: `${IMAGE_SRC}${course.imageUrl}` }}
        teacher={teacher}
      />

      <div className="w-full px-8">
        <CourseFeaturesCard
          salePrice={course.salePrice}
          features={course.features.map((item) => item.title)}
          currency={course.currency}
          price={course.price}
          onRegister={handleOpenRegisterModal}
        />
      </div>

      <div className="py-6">
        <CourseDetailsTabs
          data={{
            format: course.type,
            teacher: teacher ?? ({} as GetTeacherModel),
            features: course.features.map((el) => el.title),
            certification: course.certificate,
            studyPlan: course.studyPlan,
            practice: course.practical,
            stats: {
              durationMonths: course.duration,
              lessonDuration: 1,
            },
          }}
        />
      </div>

      {openRegisterModal && (
        <RegistrationModal
          course={course}
          isOpen
          onClose={handleCloseRegisterModal}
        />
      )}
    </>
  );
};
