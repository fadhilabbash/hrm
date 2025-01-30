export const ENDPOINTS = {
  users: "/users",
  auth: "/auth",
  userById: (id: string) => `/users/${id}`,
  employees: "/employees",
  createEmployee: "/employees",
  updateEmployee: (id: number|string) => `/employees/${id}`,
  deleteEmployee: (id: number|string) => `/employees/${id}`,
};
