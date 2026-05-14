import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { attachAuthInterceptors } from "../utils/attachAuthInterceptors";

const URL = import.meta.env.VITE_API_URL ?? "/";
const masterUsersURL = `${URL}api/master-users`;
const coursesURL = `${URL}api/courses`;
const teachersURL = `${URL}api/teachers`;
const categoriesURL = `${URL}api/categories`;
const websiteURL = `${URL}api/website`;
const supportRequestsURL = `${URL}api/support-requests`;
const subscribersURL = `${URL}api/subscribers`;
const faqURL = `${URL}api/faq`;
const partnersURL = `${URL}api/partners`;
const enrollmentsURL = `${URL}api/enrollments`;

export const baseURL = import.meta.env.VITE_BASE_URL ?? "/";

export const masterUsersClient = axios.create({
  baseURL: masterUsersURL,
});

export const coursesClient = axios.create({
  baseURL: coursesURL,
});

export const teachersClient = axios.create({
  baseURL: teachersURL,
});

export const categoriesClient = axios.create({
  baseURL: categoriesURL,
});

export const websiteClient = axios.create({
  baseURL: websiteURL,
});

export const supportRequestsClient = axios.create({
  baseURL: supportRequestsURL,
});

export const subscribersClient = axios.create({
  baseURL: subscribersURL,
});

export const faqClient = axios.create({
  baseURL: faqURL,
});

export const partnersClient = axios.create({
  baseURL: partnersURL,
});

export const enrollmentsClient = axios.create({
  baseURL: enrollmentsURL,
});

attachAuthInterceptors(masterUsersClient);
attachAuthInterceptors(coursesClient);
attachAuthInterceptors(teachersClient);
attachAuthInterceptors(categoriesClient);
attachAuthInterceptors(supportRequestsClient);
attachAuthInterceptors(subscribersClient);
attachAuthInterceptors(faqClient);
attachAuthInterceptors(partnersClient);
attachAuthInterceptors(enrollmentsClient);

export const queryOperations = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
