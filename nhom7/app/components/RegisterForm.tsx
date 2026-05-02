"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import { registerAction, RegisterState } from "@/app/actions/register";

// Client-side schema (mirror of server schema)
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

type FormValues = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const [serverState, setServerState] = useState<RegisterState | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur", // Real-time validation khi blur
  });

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    startTransition(async () => {
      const result = await registerAction(formData);
      setServerState(result);
      if (result.success) {
        reset();
      }
    });
  };

  return (
    <div className="register-card">
      <div className="card-header">
        <div className="icon-wrapper">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <h1>Đăng Ký Thành Viên</h1>
        <p>Tạo tài khoản để trải nghiệm đầy đủ tính năng</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="form-body">
        {/* Name */}
        <div className={`form-group ${errors.name ? "has-error" : ""}`}>
          <label htmlFor="name">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            </svg>
            Họ và Tên
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nguyễn Văn A"
            {...register("name")}
          />
          {errors.name && (
            <span className="error-msg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Email */}
        <div className={`form-group ${errors.email ? "has-error" : ""}`}>
          <label htmlFor="email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect
                x="2"
                y="4"
                width="20"
                height="16"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="m2 7 10 7 10-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            {...register("email")}
          />
          {errors.email && (
            <span className="error-msg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div className={`form-group ${errors.password ? "has-error" : ""}`}>
          <label htmlFor="password">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="11"
                width="18"
                height="11"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M7 11V7a5 5 0 0 1 10 0v4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Mật Khẩu
          </label>
          <input
            id="password"
            type="password"
            placeholder="Tối thiểu 8 ký tự, 1 chữ hoa, 1 số"
            {...register("password")}
          />
          {errors.password && (
            <span className="error-msg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div className={`form-group ${errors.confirmPassword ? "has-error" : ""}`}>
          <label htmlFor="confirmPassword">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 12l2 2 4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="3"
                y="11"
                width="18"
                height="11"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M7 11V7a5 5 0 0 1 10 0v4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Xác Nhận Mật Khẩu
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Nhập lại mật khẩu"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="error-msg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Server Response */}
        {serverState && (
          <div className={`server-message ${serverState.success ? "success" : "error"}`}>
            {serverState.success ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            )}
            <span>{serverState.message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className={`submit-btn ${isPending ? "loading" : ""}`}
        >
          {isPending ? (
            <>
              <span className="spinner" />
              Đang xử lý...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="9"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="19"
                  y1="8"
                  x2="19"
                  y2="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="22"
                  y1="11"
                  x2="16"
                  y2="11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Đăng Ký Ngay
            </>
          )}
        </button>
      </form>

      <p className="footer-text">
        Đã có tài khoản?{" "}
        <a href="#" className="login-link">
          Đăng nhập
        </a>
      </p>
    </div>
  );
}
