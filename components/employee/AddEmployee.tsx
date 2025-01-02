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

import { addEmployee } from "@/services/actions/employees.actions";

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
import { Loader2, PlusCircle } from "lucide-react";
import { ErrorToast, SuccessToast } from "../common/Notification";
import { Employee } from "@/lib/types";
import {
  EducationGrade,
  EmploymentType,
  Gender,
  MaritalStatus,
} from "@/lib/constants";
import ImageInput from "../common/ImageInput";
import FileInput from "../common/FileInput";
interface AddEmployeeProps {
  onSuccess: () => void;
}
const AddEmployee: React.FC<AddEmployeeProps> = ({ onSuccess }) => {
  const [lastResult, formAction, isPending] = useActionState(
    addEmployee,
    undefined,
  );

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
    if (lastResult?.type === "success") {
      setOpen(false);
      SuccessToast(lastResult.message || ".تمت الاضافة بنجاح");
        onSuccess(); 
    }
    if (lastResult?.type === "error") {
      ErrorToast(lastResult.message || ".حدث خطأ أثناء الاضافة");
    }
  }, [lastResult]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="flex items-center gap-1">
          <PlusCircle /> اضافة موضف جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>اضافة موضف جديد</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-[12px] text-destructive">
          {lastResult && lastResult.type === "error" && lastResult.message}
        </DialogDescription>

        <div className="container mx-auto p-6">
          <form
            className="space-y-8"
            id={form.id}
            onSubmit={form.onSubmit}
            action={formAction}
          >
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <ImageInput
                name={fields.image.name}
                error={fields.image.errors}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">


              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input
                  type="text"
                  id="name"
                  key={fields.name.key}
                  name={fields.name.name}
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
                />
                <div className="text-[12px] text-destructive">
                  {fields.birth_date.errors}
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="gender">الجنس</Label>
                <Select key={fields.gender.key} name={fields.gender.name}>
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
                <Select key={fields.type.key} name={fields.type.name}>
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
export default AddEmployee;
