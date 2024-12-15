// "use server";
// import { ENDPOINTS } from "../endpoints";
// import { ApiSingleResponse, Employee } from "@/lib/types";
// import apiClient from "../apiClient";

// export async function createUser(
//   prevState: ApiSingleResponse<Employee>,
//   formData: FormData,
// ) {
//   const endpoint = ENDPOINTS.createEmployee;
//   const response = await apiClient<ApiSingleResponse<Employee>>(endpoint, {
//     method: "POST",
//     body: formData,
//   });
//   return { ...prevState, ...response };
// }
'use server'; // action.ts

import { redirect } from 'next/navigation';
import { parseWithZod } from '@conform-to/zod';
import { loginSchema } from '@/lib/schemas';


export async function login(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  redirect('/employee');
}
