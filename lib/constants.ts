import {
  Calendar,
  Folder,
  Home,
  Inbox,
  Search,
  Settings,
  Users,
} from "lucide-react";
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

export const sidebarLinks = [
  {
    title: "المسميات الوظيفية",
    url: "",
    icon: Home,
  },
  {
    title: "الاقسام",
    url: "",
    icon: Folder,
  },
  {
    title: "الموظفين",
    url: "/employees",
    icon: Users,
  },
  {
    title: "الاجازات",
    url: "#",
    icon: Inbox,
  },
  {
    title: "الزمنيات",
    url: "#",
    icon: Calendar,
  },
  {
    title: "الحضور والانصراف",
    url: "#",
    icon: Search,
  },
  {
    title: "المستخدمين",
    url: "users",
    icon: Users,
  },
  {
    title: "الاعدادات",
    url: "#",
    icon: Settings,
  },
];
export const breadcrumbMapping: Record<string, string> = {
  employees: "الموضفين",
  users: "المستخدمين",
  settings: "الاعدادات",
  // Add more custom names here
};
