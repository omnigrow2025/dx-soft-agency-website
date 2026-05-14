export interface CreateTeacherModel {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  description: string;
  img: File;
  bio: string;
}
