// "use server";
// import { PaginationResponse, Post } from "@/lib/types";
// import apiClient from "../apiClient";
// import { ENDPOINTS } from "../endpoints";

// export const getPosts = async (page: number = 1, search: string = "") => {
//   const params = new URLSearchParams({ page: page.toString(), search });
//   const endpoint = `${ENDPOINTS.posts}?${params.toString()}`;

//   return apiClient<PaginationResponse<Post>>(endpoint, "application/json");
// };

// export const createPost = async (PostData: any) => {
//   const formData = new FormData();
//   formData.append("name", PostData.name);
//   formData.append("description", PostData.description);
//   formData.append("image", PostData.image);

//   const endpoint = ENDPOINTS.createPost;

//   return apiClient<{ Post: any }>(endpoint, "multipart/form-data", {
//     method: "POST",
//     body: formData,
//   });
// };

// export const updatePost = async (PostId: string, PostData: any) => {
//   const formData = new FormData();
//   formData.append("name", PostData.name);
//   formData.append("description", PostData.description);
//   if (PostData.image) formData.append("image", PostData.image);

//   const endpoint = ENDPOINTS.updatePost(PostId);

//   return apiClient<{ Post: any }>(endpoint, "multipart/form-data", {
//     method: "PUT",
//     body: formData,
//   });
// };

// export const deletePost = async (PostId: string) => {
//   const endpoint = ENDPOINTS.deletePost(PostId);

//   return apiClient<{ message: string }>(endpoint, "application/json", {
//     method: "DELETE",
//   });
// };
