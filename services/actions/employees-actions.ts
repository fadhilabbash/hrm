"use server";
import { Employee, ApiResponse } from "@/lib/types";
import { employeeSchema } from "@/lib/schemas";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";
import apiClient from "../api/api-client";
import { ENDPOINTS } from "../api/endpoints";

//Get all employee
export const getEmployees = async (
  page: number = 1,
  search: string = "",
) => {
  const params = new URLSearchParams({ page: page.toString(), search });
  const endpoint = `${ENDPOINTS.employees}?${params.toString()}`;
  const response = await apiClient<Employee>(endpoint);
  return response;
};

//Add employee
export const addEmployee = async (
  prevState: unknown,
  formData: FormData,
)=> {
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
  if (response.type === "error") {
    return submission.reply({ formErrors: [response.message as string] });
  }
  revalidatePath("/employees");
  return { status:response.type, ...submission.reply({resetForm:true}) };
};

//Edit employee
export const editEmployee = async (
  prevState: unknown,
  formData: FormData,
) => {
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
  
  const id = formData.get("id");
  formData.append("_method", "PUT");
  const endpoint = ENDPOINTS.updateEmployee(id as string);
  const response = await apiClient<Employee>(endpoint, {
    method: "POST",
    body: formData,
  });
  if (response.type === "error") {
    return submission.reply({ formErrors: [response.message as string] });
  }
  revalidatePath("/employees");
  return { status:response.type, ...submission.reply({resetForm:true}) };
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
