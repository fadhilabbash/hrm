"use client";

import { useActionState, useEffect, useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { employeeSchema } from "@/lib/schemas";
import { Label } from "../ui/label";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Edit, Loader2 } from "lucide-react";
import { Employee } from "@/lib/types";

import {
  avatar,
  EducationGrade,
  EmploymentType,
  Gender,
  MaritalStatus,
} from "@/lib/constants";
import ImageInput from "../common/image-input";
import FileInput from "../common/file-input";
import { editEmployee } from "@/services/actions/employees-actions";
import { ErrorToast, SuccessToast } from "../common/notification";

interface EditEmployeeProps {
  row: Employee;
}
const EditEmployee: React.FC<EditEmployeeProps> = ({ row }) => {
  const [lastResult, formAction, isPending] = useActionState(
    editEmployee,
    undefined,
  );
 
  const baseFileUrl = process.env.NEXT_PUBLIC_BASE_FILES_URL;
  const [open, setOpen] = useState(false);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: employeeSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  useEffect(() => {
    if (lastResult?.status === "success") {
      setOpen(false);
      SuccessToast(".تمت الاضافة بنجاح");
    }
    if (lastResult?.status === "error") {
      ErrorToast(`${form.errors} .حدث خطأ أثناء الاضافة`);
    }
  }, [lastResult,form.errors]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Edit className="h-4 w-4" />
          تعديل
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>تعديل بيانات موظف</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-[12px] text-destructive">
        {form.errors}
        </DialogDescription>

        <div className="container mx-auto p-6">
          <form
            className="space-y-8"
            id={form.id}
            onSubmit={form.onSubmit}
            action={formAction}
          >
            <input type="hidden" name="id" value={row.id} />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <ImageInput
                name={fields.image.name}
                error={fields.image.errors}
                initialImage={
                  row.image ? `${baseFileUrl}/${row.image}` : avatar
                }
              />
              <div className="text-[12px] text-destructive">
                {fields.name.errors}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input
                  type="text"
                  id="name"
                  key={fields.name.key}
                  name={fields.name.name}
                  defaultValue={row.name}
                />
                <div className="text-[12px] text-destructive">
                  {fields.name.errors}
                </div>
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="birth_date">تاريخ الميلاد</Label>
                <Input
                  type="date"
                  id="birth_date"
                  key={fields.birth_date.key}
                  name={fields.birth_date.name}
                  defaultValue={row.birth_date}
                />
                <div className="text-[12px] text-destructive">
                  {fields.birth_date.errors}
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="gender">الجنس</Label>
                <Select
                  key={fields.gender.key}
                  name={fields.gender.name}
                  defaultValue={row.gender}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الجنس" />
                  </SelectTrigger>

                  <SelectContent>
                    {Gender.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-[12px] text-destructive">
                  {fields.gender.errors}
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="marital_status">الحالة الزوجية</Label>
                <Select
                  key={fields.marital_status.key}
                  name={fields.marital_status.name}
                  defaultValue={row.marital_status}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة الزوجية" />
                  </SelectTrigger>

                  <SelectContent>
                    {MaritalStatus.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-[12px] text-destructive">
                  {fields.marital_status.errors}
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="address">العنوان</Label>
                <Input
                  type="text"
                  id="address"
                  key={fields.address.key}
                  name={fields.address.name}
                  defaultValue={row.address}
                />
                <div className="text-[12px] text-destructive">
                  {fields.address.errors}
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="mobile">الموبايل</Label>
                <Input
                  type="text"
                  id="mobile"
                  key={fields.mobile.key}
                  name={fields.mobile.name}
                  defaultValue={row.mobile}
                />
                <div className="text-[12px] text-destructive">
                  {fields.mobile.errors}
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="emergency_mobile">موبايل الطواريء</Label>
                <Input
                  type="text"
                  id="emergency_mobile"
                  key={fields.emergency_mobile.key}
                  name={fields.emergency_mobile.name}
                  defaultValue={row.emergency_mobile}
                />
                <div className="text-[12px] text-destructive">
                  {fields.emergency_mobile.errors}
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">البريد الالكتروني</Label>
                <Input
                  type="text"
                  id="email"
                  key={fields.email.key}
                  name={fields.email.name}
                  defaultValue={row.email}
                />
                <div className="text-[12px] text-destructive">
                  {fields.email.errors}
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="badge_number">رقم الباج</Label>
                <Input
                  type="text"
                  id="badge_number"
                  key={fields.badge_number.key}
                  name={fields.badge_number.name}
                  defaultValue={row.badge_number}
                />
                <div className="text-[12px] text-destructive">
                  {fields.badge_number.errors}
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="hiring_date">تاريخ التعيين</Label>
                <Input
                  type="date"
                  id="hiring_date"
                  key={fields.hiring_date.key}
                  name={fields.hiring_date.name}
                  defaultValue={row.hiring_date}
                />
                <div className="text-[12px] text-destructive">
                  {fields.hiring_date.errors}
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="education_grade"> الشهادة</Label>
                <Select
                  key={fields.education_grade.key}
                  name={fields.education_grade.name}
                  defaultValue={row.education_grade}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر  الشهادة" />
                  </SelectTrigger>

                  <SelectContent>
                    {EducationGrade.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-[12px] text-destructive">
                  {fields.education_grade.errors}
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="department_id"> القسم</Label>
                <Select
                  key={fields.department_id.key}
                  name={fields.department_id.name}
                  defaultValue={row.department_id.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر  القسم" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="1">قسم 1</SelectItem>
                    <SelectItem value="2">قسم 2</SelectItem>
                    <SelectItem value="3">قسم 3</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-[12px] text-destructive">
                  {fields.department_id.errors}
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="position_id">الموقع الوظيفي</Label>
                <Select
                  key={fields.position_id.key}
                  name={fields.position_id.name}
                  defaultValue={row.position_id.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر  الموقع الوظيفي" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="1">مدير</SelectItem>
                    <SelectItem value="2">معاون</SelectItem>
                    <SelectItem value="3">مسؤول وحدة</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-[12px] text-destructive">
                  {fields.position_id.errors}
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="type">نوع التوظيف</Label>
                <Select
                  key={fields.type.key}
                  name={fields.type.name}
                  value={row.type}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر  نوع التوظيف" />
                  </SelectTrigger>

                  <SelectContent>
                    {EmploymentType.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-[12px] text-destructive">
                  {fields.type.errors}
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="salary">الراتب</Label>
                <Input
                  type="number"
                  id="salary"
                  key={fields.salary.key}
                  name={fields.salary.name}
                  defaultValue={row.salary}
                />
                <div className="text-[12px] text-destructive">
                  {fields.salary.errors}
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <FileInput
                  label="المرفقات"
                  name={fields.file.name}
                  error={fields.file.errors}
                  initialFileUrl={row.file ? `${baseFileUrl}/${row.file}` : ""}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isPending} className="ml-2 mt-2">
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span> جار الحفظ..</span>
                  </>
                ) : (
                  "حفظ"
                )}
              </Button>
              <DialogClose asChild>
                <Button type="button" className="mt-2" variant="outline">
                  الغاء
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default EditEmployee;
