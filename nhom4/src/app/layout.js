import { ThemeProvider } from "../context/ThemeContext";
import "./globals.css";

export const metadata = {
  title: "Ghi Chú Cá Nhân",
  description: "Ứng dụng quản lý ghi chú cá nhân sử dụng Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
