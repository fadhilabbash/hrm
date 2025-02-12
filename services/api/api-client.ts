"use server";

import { ApiResponse, ErrorApiResponse, SuccessApiResponse} from "@/lib/types";

const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const config = {
    ...options,
    headers: {
      Accept: "application/json",
      ...options.headers,
    },
  };

  const response = await fetch(`${baseUrl}${endpoint}`, config);

  // Handle 2xx responses (Success)
  if (response.ok) {
    const data = await response.json();
    return data as SuccessApiResponse<T>;
  }

  // Handle 4xx responses (Client Errors)
  if (response.status >= 400 && response.status < 500) {
    const errorData = await response.json();
    return errorData as ErrorApiResponse;
  }

  // Handle 5xx responses (Server Errors)
  if (response.status >= 500) {
    const errorData = {
      type: "error",
      message: `حدث خطأ في الخادم: ${response.status} - ${response.statusText}`,
    };
    return errorData as ErrorApiResponse;
  }

  // If for some reason the status code isn't recognized
  const errorData = {
    type: "error",
    message: `خطأ غير متوقع: ${response.status}. الرجاء المحاولة لاحقًا.`,
  };
  return errorData as ErrorApiResponse;
};
export default apiClient;
