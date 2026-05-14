import type { EnrollmentsListQueryOptionModel } from "../../modules/backoffice/pages/admin/items/enrollments/models/enrollmentsQuery.model";
import type { GetEnrollmentsModel } from "../../modules/backoffice/pages/admin/items/enrollments/models/getEnrollments.model";
import type { CreateEnrollmentModel } from "../models/createEnrollment.model";
import { enrollmentsClient } from "./httpClient";

export const enrollmentsApi = {
  get(params: EnrollmentsListQueryOptionModel) {
    return enrollmentsClient.get<GetEnrollmentsModel>("/", { params });
  },
  delete(id: number) {
    return enrollmentsClient.delete(`/${id}`);
  },
  create(data: CreateEnrollmentModel) {
    return enrollmentsClient.post("/", data);
  },
};
