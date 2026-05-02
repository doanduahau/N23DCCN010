import type { Metadata } from "next";
import RegisterForm from "@/app/components/RegisterForm";

export const metadata: Metadata = {
  title: "Đăng Ký Thành Viên | Nhóm 7",
  description:
    "Form đăng ký thành viên với React Hook Form, Zod validation và Next.js Server Actions",
};

export default function Home() {
  return (
    <main className="page-wrapper">
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <RegisterForm />
    </main>
  );
}
