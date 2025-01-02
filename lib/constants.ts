export const MaritalStatus = [
  { value: "single", label: "أعزب" },
  { value: "married", label: "متزوج" },
  { value: "divorced", label: "مطلق" },
  { value: "widowed", label: "أرمل" },
];

export const EducationGrade = [
  { value: "none", label: "لا يوجد" },
  { value: "primary", label: "ابتدائي" },
  { value: "secondary", label: "إعدادي" },
  { value: "high_school", label: "ثانوي" },
  { value: "bachelor", label: "بكالوريوس" },
  { value: "master", label: "ماجستير" },
  { value: "doctorate", label: "دكتوراه" },
  { value: "other", label: "آخر" },
];

export const Gender = [
  { value: "male", label: "ذكر" },
  { value: "female", label: "أنثى" },
];

export const EmploymentType = [
  { value: "permanent", label: "دائم" },
  { value: "contract", label: "عقد" },
  { value: "intern", label: "تدريب" },
];
export const avatar = "/images/avatar.jpg";

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