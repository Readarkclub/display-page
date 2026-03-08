import type { Metadata, Viewport } from "next";
import Analytics from "./components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "David Li - AI时代的产品探索者 | 学习成果展示",
  description: "7次AI编程课程实践成果，展示AI写作助手、太平年介绍页等项目，分享产品思维与学习路径",
  keywords: ["AI编程", "产品探索", "学习成果", "David Li", "AI写作助手", "太平年介绍页"],
  authors: [{ name: "David Li" }],
  openGraph: {
    title: "David Li - AI时代的产品探索者",
    description: "7次AI编程课程实践成果，展示AI写作助手、太平年介绍页等项目",
    type: "website",
    locale: "zh_CN",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;1,9..40,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "David Li",
              jobTitle: "AI时代的产品探索者",
              description: "从传统开发到AI编程的实践者，相信AI工具能让每个人成为创造者",
              email: "2069904600@qq.com",
              knowsAbout: ["AI编程", "产品设计", "全栈开发", "Next.js", "React"],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {process.env.NODE_ENV === 'development' && <Analytics />}
        {children}
      </body>
    </html>
  );
}
