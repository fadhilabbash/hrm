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

interface ViewEmployeeProps {
  row: Employee;
}

const ViewEmployee: React.FC<ViewEmployeeProps> = ({ row }) => {
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col">
              <Label className="mb-1">اسم الصورة</Label>
              <p className="rounded-md border p-2">{row.image_name}</p>
            </div>

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
              <Label className="mb-1">تاريخ التعيين</Label>
              <p className="rounded-md border p-2">{row.hiring_date}</p>
            </div>

            <div className="flex flex-col">
              <Label className="mb-1">القسم</Label>
              <p className="rounded-md border p-2">{row.department_id}</p>
            </div>

            <div className="flex flex-col">
              <Label className="mb-1">الشهادة</Label>
              <p className="rounded-md border p-2">{row.education_grade}</p>
            </div>

            <div className="flex flex-col">
              <Label className="mb-1">نوع التوضيف</Label>
              <p className="rounded-md border p-2">{row.type}</p>
            </div>

            <div className="flex flex-col">
              <Label className="mb-1">الراتب</Label>
              <p className="rounded-md border p-2">{row.salary}</p>
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
