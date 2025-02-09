import { SubmissionResult } from "@conform-to/react";

export interface Employee {
  id: number | string;
  image: string;
  name: string;
  birth_date: string;
  gender: string;
  marital_status: string;
  address: string;
  mobile: string;
  emergency_mobile: string;
  email: string;
  badge_number: string;
  hiring_date: string;
  education_grade: string;
  department_id: string;
  position_id: string;
  type: string;
  salary: string;
  file: string;
}

type Pagination = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type SuccessApiResponse<T> = {
  type: "success";
  message?: string;
  data?: T;
  pagination?: Pagination;
};
export type ErrorApiResponse = {
  type: "error";
  message?: string;
  errors?: Record<string, string>;
};
type ExtendedSubmissionResult<FormError = string[]> =
  SubmissionResult<FormError> & {
    type?: "validation";
  };

export type ApiResponse<T> = SuccessApiResponse<T> | ErrorApiResponse;
export type FormActionResponse<T> = ExtendedSubmissionResult | ApiResponse<T>;
