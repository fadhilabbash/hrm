"use server";
import apiClient from "../apiClient";
import { ENDPOINTS } from "../endpoints";

export const getProducts = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
  });
  const endpoint = `${ENDPOINTS.products}?${params.toString()}`;

  return apiClient<{ products: any[] }>(endpoint, "application/json");
};

export const createProduct = async (productData: any) => {
  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("image", productData.image);

  const endpoint = ENDPOINTS.createProduct;

  return apiClient<{ product: any }>(endpoint, "multipart/form-data", {
    method: "POST",
    body: formData,
  });
};

export const updateProduct = async (productId: string, productData: any) => {
  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  if (productData.image) formData.append("image", productData.image);

  const endpoint = ENDPOINTS.updateProduct(productId);

  return apiClient<{ product: any }>(endpoint, "multipart/form-data", {
    method: "PUT",
    body: formData,
  });
};

export const deleteProduct = async (productId: string) => {
  const endpoint = ENDPOINTS.deleteProduct(productId);

  return apiClient<{ message: string }>(endpoint, "application/json", {
    method: "DELETE",
  });
};
