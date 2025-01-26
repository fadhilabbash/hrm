import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EducationGrade, EmploymentType, Gender, MaritalStatus } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const geMaritalStatus=(value:string)=>{
  const maritalStatus = MaritalStatus.find(
    (item) => item.value === value,
  );
  return maritalStatus ? maritalStatus.label : "غير معروف";
}
export const getEducationGrade=(value:string)=>{
  const educationGrade = EducationGrade.find(
    (item) => item.value === value,
  );
  return educationGrade ? educationGrade.label : "غير معروف";
}
export const getGender=(value:string)=>{
  const gender = Gender.find(
    (item) => item.value === value,
  );
  return gender ? gender.label : "غير معروف";
}
export const getEmployeeType=(value:string)=>{
  const employmentType = EmploymentType.find(
    (item) => item.value === value,
  );
  return employmentType ? employmentType.label : "غير معروف";
}