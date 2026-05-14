import type {
  FeatureModel,
  StudyPlanModel,
} from "../../../../../../../common/models/getCourse.model";

export interface CreateCourseModel {
  title: string;
  img: File;
  categoryId: number;
  level: string;
  price: number;
  duration: number;
  currency: string;
  practical: string;
  isGroup: boolean;
  description: string;
  type: string;
  features: FeatureModel[];
  studyPlan: StudyPlanModel[];
  certificate: string;
  teacherId?: string;
  salePrice?: number;
}
