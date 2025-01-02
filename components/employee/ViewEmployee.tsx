"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Eye } from "lucide-react";
import { Employee } from "@/lib/types";
import { avatar } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

interface ViewEmployeeProps {
  row: Employee;
}

const ViewEmployee: React.FC<ViewEmployeeProps> = ({ row }) => {
  const baseFileUrl = process.env.NEXT_PUBLIC_BASE_FILES_URL;
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Eye className="h-4 w-4 text-green-500" />
          عرض
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>عرض بيانات الموظف</DialogTitle>
        </DialogHeader>
        <div className="container mx-auto p-6">
          <div className="mb-2 flex flex-col">
            <Image
              src={row.image ? `${baseFileUrl}/${row.image}` : avatar}
              alt="avatar"
              className="h-18 w-18 object-cover rounded-md"
              width={100}
              height={100}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col">
              <Label className="mb-1">الاسم الكامل</Label>
              <p className="rounded-md border p-2">{row.name}</p>
            </div>

            <div className="flex flex-col">
              <Label className="mb-1">تاريخ الميلاد</Label>
              <p className="rounded-md border p-2">{row.birth_date}</p>
            </div>

            <div className="flex flex-col">
              <Label className="mb-1">الجنس</Label>
              <p className="rounded-md border p-2">{row.gender}</p>
            </div>

            <div className="flex flex-col">
              <Label className="mb-1">الحالة الزوجية</Label>
              <p className="rounded-md border p-2">{row.marital_status}</p>
            </div>

            <div className="flex flex-col">
              <Label className="mb-1">العنوان</Label>
              <p className="rounded-md border p-2">{row.address}</p>
            </div>

            <div className="flex flex-col">
              <Label className="mb-1">الموبايل</Label>
              <p className="rounded-md border p-2">{row.mobile}</p>
            </div>
            <div className="flex flex-col">
              <Label className="mb-1">موبايل الطواريء</Label>
              <p className="rounded-md border p-2">{row.emergency_mobile}</p>
            </div>
            <div className="flex flex-col">
              <Label className="mb-1">البريد الالكتروني</Label>
              <p className="rounded-md border p-2">{row.email}</p>
            </div>
            <div className="flex flex-col">
              <Label className="mb-1">رقم الباج</Label>
              <p className="rounded-md border p-2">{row.badge_number}</p>
            </div>

            <div className="flex flex-col">
              <Label className="mb-1">تاريخ التعيين</Label>
              <p className="rounded-md border p-2">{row.hiring_date}</p>
            </div>
            <div className="flex flex-col">
              <Label className="mb-1">الشهادة</Label>
              <p className="rounded-md border p-2">{row.education_grade}</p>
            </div>

            <div className="flex flex-col">
              <Label className="mb-1">القسم</Label>
              <p className="rounded-md border p-2">{row.department_id}</p>
            </div>
            <div className="flex flex-col">
              <Label className="mb-1">الموقع الوضيفي</Label>
              <p className="rounded-md border p-2">{row.position_id}</p>
            </div>

            <div className="flex flex-col">
              <Label className="mb-1">نوع التوضيف</Label>
              <p className="rounded-md border p-2">{row.type}</p>
            </div>

            <div className="flex flex-col">
              <Label className="mb-1">الراتب</Label>
              <p className="rounded-md border p-2">{row.salary}</p>
            </div>
          
            <div className="flex">
              <Link
                href={row.file ? `${baseFileUrl}/${row.file}` : "#"}
                className="rounded-md p-2 text-blue-600 hover:text-blue-400 underline"
              >
                المرفقات
              </Link>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="mt-2" variant="outline">
              الغاء
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewEmployee;
