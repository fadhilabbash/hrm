"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { Employee } from "@/lib/types";
import EditEmployee from "@/components/employee/EditEmployee";
import ViewEmployee from "@/components/employee/ViewEmployee";
import DeleteAlertDialog from "@/components/common/DeleteAlertDialog";
import { deleteEmployee } from "@/services/actions/employees.actions";
import { ErrorToast, SuccessToast } from "../common/Notification";
import Image from "next/image";
import { avatar, EmploymentType } from "@/lib/constants";
// Extend ColumnMeta to include 'displayName'
declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    displayName?: string; // Make it optional
  }
}
const baseFileUrl = process.env.NEXT_PUBLIC_BASE_FILES_URL;

// Columns definition
export const Columns = (refetch: () => void): ColumnDef<Employee>[] => [
  {
    accessorKey: "id",
    header: "التسلسل",
    meta: { displayName: "التسلسل" },
  },
  {
    accessorKey: "name",
    header: "الاسم",
    meta: { displayName: "الاسم" },
  },
  {
    accessorKey: "address",
    header: "العنوان",
    meta: { displayName: "العنوان" },
  },
  {
    accessorKey: "mobile",
    header: "الموبايل",
    meta: { displayName: "الموبايل" },
  },
  {
    accessorKey: "emergency_mobile",
    header: "موبايل الطواريء",
    meta: { displayName: "موبايل الطواريء" },
  },
  {
    accessorKey: "hiring_date",
    header: "تاريخ التعيين",
    meta: { displayName: "تاريخ التعيين" },
  },
  {
    accessorKey: "department_id",
    header: "القسم",
    meta: { displayName: "القسم" },
  },
  {
    accessorKey: "type",
    header: "نوع التوظيف",
    meta: { displayName: "نوع التوظيف" },
    cell: ({ row }) => {
      const employmentType = EmploymentType.find(
        (type) => type.value === row.original.type,
      );
      return employmentType ? employmentType.label : "غير معروف";
    },
  },
  {
    accessorKey: "image",
    header: "الصورة",
    meta: { displayName: "الصورة" },
    cell: ({ row }) => {
      const imageUrl = row.original.image
        ? `${baseFileUrl}/${row.original.image}`
        : avatar;

      return (
        <Image
          src={imageUrl}
          alt="avatar"
          className="h-12 w-12 rounded-full object-cover"
          width={100}
          height={100}
        />
      );
    },
  },
  {
    id: "actions",
    header: "الإجراءات",
    meta: { displayName: "الإجراءات" },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          {/* View Button */}
          <ViewEmployee row={row.original} />
          {/* Edit Button */}
          <EditEmployee row={row.original} onSuccess={refetch} />
          {/* Delete Button */}

          <DeleteAlertDialog
            icon={<Trash2 className="h-4 w-4 text-destructive" />}
            title="تاكيد الحذف"
            description="هل أنت متأكد أنك تريد الحذف؟ هذا الأمر غير قابل للتراجع."
            onConfirm={async () => {
              const response = await deleteEmployee(row.original.id);
              if (response.type === "success") {
                SuccessToast(response.message || ".تم الحذف بنجاح");
                refetch();
              } else if (response.type === "error") {
                ErrorToast(response.message || ".حدث خطأ أثناء الحذف");
              }
            }}
            confirmLabel="نعم"
            cancelLabel="لا"
          />
        </div>
      );
    },
  },
];
