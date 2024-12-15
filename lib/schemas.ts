import { z } from "zod";

export const employeeSchema = z.object({
  image: z.instanceof(File, { message: "الملف يجب أن يكون صورة" }).optional(),
  name: z
    .string({ message: "هذا الحقل مطلوب" })
    .min(2, { message: "الاسم يجب أن يحتوي على حرفين على الأقل." }),

  birth_date: z
    .preprocess(
      (value) => {
        // Ensure the value is converted into a valid Date object
        const dateValue =
          typeof value === "string" || value instanceof String
            ? new Date(value as string)
            : value;
        return dateValue instanceof Date && !isNaN(dateValue.getTime())
          ? dateValue
          : undefined;
      },
      z.date({ message: "الرجاء إدخال تاريخ صحيح" }),
    )
    .refine((date) => date <= new Date(), {
      message: "تاريخ الميلاد لا يمكن أن يكون في المستقبل",
    }),

  gender: z.string({ message: "هذا الحقل مطلوب" }),
  marital_status: z.string({ message: "هذا الحقل مطلوب" }),
  address: z.string({ message: "هذا الحقل مطلوب" }),

  mobile: z
    .string({ message: "هذا الحقل مطلوب" })
    .length(11, { message: "رقم الهاتف يجب أن يتكون من 11 حرفًا." }),

  emergency_mobile: z
    .string({ message: "هذا الحقل مطلوب" })
    .length(11, { message: "رقم الهاتف يجب أن يتكون من 11 حرفًا." }),

  email: z
    .string({ message: "هذا الحقل مطلوب" })
    .email("البريد الإلكتروني غير صالح"),
  badge_number: z.string({ message: "هذا الحقل مطلوب" }),
  hiring_date: z
    .preprocess(
      (value) => {
        // Ensure the value is converted into a valid Date object
        const dateValue =
          typeof value === "string" || value instanceof String
            ? new Date(value as string)
            : value;
        return dateValue instanceof Date && !isNaN(dateValue.getTime())
          ? dateValue
          : undefined;
      },
      z.date({ message: "الرجاء إدخال تاريخ صحيح" }),
    )
    .refine((date) => date <= new Date(), {
      message: "تاريخ التعيين لا يمكن أن يكون في المستقبل",
    }),
  department_id: z.string({ message: "هذا الحقل مطلوب" }),
  position_id: z.string({ message: "هذا الحقل مطلوب" }),
  education_grade: z.string({ message: "هذا الحقل مطلوب" }),
  type: z.string({ message: "هذا الحقل مطلوب" }),
  salary: z.string({ message: "هذا الحقل مطلوب" }),
  file: z
    .instanceof(File, { message: "الملف يجب أن يكون صورة أو مستند PDF/Office" })
    .optional(),
  // file: z
  //   .instanceof(File, { message: "يجب أن يكون الملف من نوع صالح" }).nullish()
  //   .refine(
  //     (file) =>
  //       !file ||
  //       [
  //         "application/pdf",
  //         "application/msword",
  //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //       ].includes(file.type),
  //     {
  //       message: "الرجاء اختيار ملف بتنسيق صالح (PDF, DOC, DOCX)",
  //     },
  //   )
});
// image: z
//   .instanceof(File, { message: "يجب أن يكون الملف من نوع صورة" }) .nullish()
//   .refine(
//     (image) =>
//       !image ||
//       ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
//         image.type,
//       ),
//     {
//       message: "الرجاء اختيار صورة بتنسيق صالح (JPEG, PNG, GIF)",
//     },
//   ),
