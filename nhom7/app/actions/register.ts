"use server";

import type { ZodIssue } from "zod";

import { z } from "zod";

const formSchema = z
  .object({
    name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z
      .string()
      .min(8, "Tối thiểu 8 ký tự")
      .regex(/[A-Z]/, "Cần 1 chữ hoa")
      .regex(/[0-9]/, "Cần ít nhất 1 số"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type RegisterState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function registerAction(
  formData: FormData
): Promise<RegisterState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  // Double validation on server
  const result = formSchema.safeParse(raw);

  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {};
    result.error.issues.forEach((err: ZodIssue) => {
      const field = err.path[0] as string;
      if (!fieldErrors[field]) fieldErrors[field] = [];
      fieldErrors[field].push(err.message);
    });
    return {
      success: false,
      message: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.",
      errors: fieldErrors,
    };
  }

  // Simulate processing (e.g., save to DB)
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    success: true,
    message: `Đăng ký thành công! Chào mừng ${result.data.name} 🎉`,
  };
}
