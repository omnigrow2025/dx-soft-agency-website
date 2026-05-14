import type { FaqItem } from "../../../common/models/faq.model";
import type { GetTeacherModel } from "../../../common/models/getTeacher.model";
import type { PartnerModel } from "../../../common/models/partner.model";
import type { GetCategoryModel } from "../../../common/models/getCategory.model";

export interface WebsiteData {
  categories: GetCategoryModel[];
  teachers: GetTeacherModel[];
  faq: FaqItem[];
  partners: PartnerModel[];
}
