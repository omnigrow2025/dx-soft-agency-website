export interface UpdateTeacherModel {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  description: string;
  bio: string;
  img?: File;
  imageUrl?: string;
}
