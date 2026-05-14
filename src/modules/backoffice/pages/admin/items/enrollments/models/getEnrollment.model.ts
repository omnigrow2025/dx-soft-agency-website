export interface GetEnrollmentModel {
  id: number;
  fullname: string;
  email: string;
  phoneNumber: string;
  courseId: string;
  createdAt: string;
  course: GetEnrollmentModelWithCourse;
}

export interface GetEnrollmentModelWithCourse {
  id: string;
  state: boolean;
  title: string;
}
