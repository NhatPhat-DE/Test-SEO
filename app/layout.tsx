import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Fullstack SEO Demo",
  description: "Ứng dụng web Fullstack với Next.js, Prisma, SQLite và tối ưu SEO cơ bản.",
  keywords: ["Next.js", "Fullstack", "SEO", "Prisma", "SQLite"],
  authors: [{ name: "Sinh viên thực hiện" }],
  openGraph: {
    title: "Next.js Fullstack SEO Demo",
    description: "Demo cài đặt và sử dụng ứng dụng Next.js Fullstack.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
<body>{children}</body>
    </html>
  );
}
