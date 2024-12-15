"use server";
import { Employee, ApiResponseWithValidation, ApiResponse } from "@/lib/types";
import apiClient from "../apiClient";
import { ENDPOINTS } from "../endpoints";
import { employeeSchema } from "@/lib/schemas";
import { parseWithZod } from "@conform-to/zod";

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







export const addEmployee = async (
  prevState: unknown,
  formData: FormData,
): Promise<ApiResponseWithValidation<Employee>> => {
  // Validate file fields
  const validateFile = (file: FormDataEntryValue | null): boolean => {
    return file instanceof File && file.size > 0;
  };

  // Remove invalid or empty files
  if (!validateFile(formData.get("image"))) formData.delete("image");
  if (!validateFile(formData.get("file"))) formData.delete("file");

  // Define a single-argument schema function for parseWithZod
  const schema = (control: any) =>
    employeeSchema(control, {
      isFieldUnique: async (field: string, value: string) => {
        // Call your API or backend to validate uniqueness
        try {
          const response = await apiClient<{ isUnique: boolean }>(
            ENDPOINTS.checkFieldUnique,
            {
              method: "POST",
              body: JSON.stringify({ field, value }),
              headers: { "Content-Type": "application/json" },
            },
          );
          return response.isUnique;
        } catch (error) {
          console.error(`Error checking uniqueness for field: ${field}`, error);
          return false; // Assume not unique in case of error
        }
      },
    });

  // Parse FormData with validation
  const submission = await parseWithZod(formData, {
    schema, // Now uses a compatible single-argument schema function
    async: true,
  });

  // Handle validation errors
  if (submission.status !== "success") {
    return submission.reply(); // Respond with validation errors
  }

  console.log("Form Data After Validation:", formData);

  // Send validated FormData to backend
  try {
    const endpoint = ENDPOINTS.createEmployee;
    const response = await apiClient<Employee>(endpoint, {
      method: "POST",
      body: formData,
    });
    return response;
  } catch (error) {
    console.error("Error adding employee:", error);
    return {
      status: "error",
      message: "An unexpected error occurred.",
    } as ApiResponseWithValidation<Employee>;
  }
};


//Add employee
// export const addEmployee = async (
//   prevState: unknown,
//   formData: FormData,
// ): Promise<ApiResponseWithValidation<Employee>> => {
  
  
//   const validateFile = (file: FormDataEntryValue | null): boolean => {
//     return file instanceof File && file.size > 0;
//   };

//   if (!validateFile(formData.get('image'))) formData.delete('image');
//   if (!validateFile(formData.get('file'))) formData.delete('file');


//   // const submission = parseWithZod(formData, {
//   //   schema: employeeSchema,
//   // });
//   const submission = await parseWithZod(formData, {
//     schema: (control) =>
//       employeeSchema(control, {
//         isFieldUnique: async (field, value) => {
//           // The uniqueness check will rely on the backend response
//           return false; // Temporarily allow Zod to proceed
//         },
//       }),
//     async: true,
//   });

//   console.log('Validation Results:', submission);
//   if (submission.status !== "success") {
//     return submission.reply();
//   }
//   console.log("Form Data After Validation:", formData);
//   const endpoint = ENDPOINTS.createEmployee;
//   const response = await apiClient<Employee>(endpoint, {
//     method: "POST",
//     body: formData,
//   });
//   return response;
// };








//Edit employee
export const editEmployee = async (
  prevState: unknown,
  formData: FormData,
): Promise<ApiResponseWithValidation<Employee>> => {
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

  return response;
};
//Delete employee
export const deleteEmployee = async (
  employeeId: string | number,
): Promise<ApiResponse<Employee>> => {
  const endpoint = ENDPOINTS.deleteEmployee(employeeId);
  const response = await apiClient<Employee>(endpoint, { method: "DELETE" });
  return response;
};
