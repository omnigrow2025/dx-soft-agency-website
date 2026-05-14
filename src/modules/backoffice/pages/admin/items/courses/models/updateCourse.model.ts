import type {
  FeatureModel,
  StudyPlanModel,
} from "../../../../../../../common/models/getCourse.model";

export interface UpdateCourseModel {
  title: string;
  img?: File;
  imageUrl?: string;
  categoryId: number;
  level: string;
  price: number;
  duration: number;
  currency: string;
  practical: string;
  type: string;
  description: string;
  isGroup: boolean;
  features: FeatureModel[];
  studyPlan: StudyPlanModel[];
  certificate: string;
  teacherId?: string;
  salePrice?: number;
}
