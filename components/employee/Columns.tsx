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
import { avatar } from "@/lib/constants";
import Link from "next/link";
import { getEmployeeType } from "@/lib/utils";
// Extend ColumnMeta to include 'displayName'
declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    displayName?: string; 
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
      return getEmployeeType(row.original.type); 
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
          className="h-12 w-12 rounded-md object-cover"
          width={100}
          height={100}
        />
      );
    },
  },
  {
    accessorKey: "file",
    header: "الملف",
    meta: { displayName: "الملف" },
    cell: ({ row }) => {
      const fileUrl = row.original.file
        ? `${baseFileUrl}/${row.original.file}`
        : null;
  
      return fileUrl ? (
        <Link
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md p-2 text-zinc-900 underline hover:text-zinc-700"
      >
        المرفقات
      </Link>
      ) : (
        <span className="text-gray-400">لا يوجد ملف</span>
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
            icon={<Trash2 className="h-4 w-4" />}
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
