"use server";
import { Employee, ApiResponse} from "@/lib/types";
import { employeeSchema } from "@/lib/schemas";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";
import apiClient from "../api/api-client";
import { ENDPOINTS } from "../api/endpoints";
import { SubmissionResult } from "@conform-to/react";

//Get all employee
export const getEmployees = async (
  page: number = 1,
  search: string = "",
): Promise<ApiResponse<Employee>> => {
  const params = new URLSearchParams({ page: page.toString(), search });
  const endpoint = `${ENDPOINTS.employees}?${params.toString()}`;
  const response = await apiClient<Employee>(endpoint);
  return response;
};

//Add employee
export const addEmployee = async (
  prevState: unknown,
  formData: FormData,
): Promise<SubmissionResult<string[]> | ApiResponse<Employee>> => {
  const validateFile = (file: FormDataEntryValue | null): boolean => {
    return file instanceof File && file.size > 0;
  };

  if (!validateFile(formData.get("image"))) formData.delete("image");
  if (!validateFile(formData.get("file"))) formData.delete("file");

  const submission = parseWithZod(formData, {
    schema: employeeSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const endpoint = ENDPOINTS.createEmployee;
  const response = await apiClient<Employee>(endpoint, {
    method: "POST",
    body: formData,
  });
  revalidatePath("/employees");
  return response;
};

//Edit employee
export const editEmployee = async (
  prevState: unknown,
  formData: FormData,
): Promise<SubmissionResult<string[]> | ApiResponse<Employee>> => {
  const submission = parseWithZod(formData, {
    schema: employeeSchema,
  });
  const imageFile = formData.get("image");
  const fileFile = formData.get("file");

  if (imageFile && imageFile instanceof File && imageFile.size === 0) {
    formData.delete("image");
  }

  if (fileFile && fileFile instanceof File && fileFile.size === 0) {
    formData.delete("file");
  }
  if (submission.status !== "success") {
    return submission.reply();
  }
  // Retrieve the ID from the formData
  const id = formData.get("id");

  // Ensure the ID exists and is valid
  if (!id || typeof id !== "string") {
    throw new Error("Employee ID is required and must be a string");
  }
  formData.append("_method", "PUT");
  const endpoint = ENDPOINTS.updateEmployee(id);
  const response = await apiClient<Employee>(endpoint, {
    method: "POST",
    body: formData,
  });
  revalidatePath("/employees");
  return response;
};
//Delete employee
export const deleteEmployee = async (
  employeeId: string | number,
): Promise<ApiResponse<Employee>> => {
  const endpoint = ENDPOINTS.deleteEmployee(employeeId);
  const response = await apiClient<Employee>(endpoint, { method: "DELETE" });
  revalidatePath("/employees");
  return response;
};
