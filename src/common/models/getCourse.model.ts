export interface GetCourseModel {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  teacherId: string | null;
  level: string;
  price: number;
  duration: number;
  currency: string;
  practical: string;
  isGroup: boolean;
  description: string;
  state: boolean;
  type: string;
  features: FeatureModel[];
  studyPlan: StudyPlanModel[];
  certificate: string;
  salePrice: number | null;
}

export interface FeatureModel {
  title: string;
}

export interface StudyPlanModel {
  title: string;
  description: string;
  order?: number;
}
