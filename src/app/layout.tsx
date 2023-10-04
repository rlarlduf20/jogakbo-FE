import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "조각보",
  description: "작은 기억의 조각들로 추억을 떠올려요.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <header className="w-full flex">
          <Link href="/" className="flex-grow">
            Jogakbo
          </Link>
          <Link href="/sign">로그인/가입</Link>
        </header>
        <main>{children}</main>
        <footer>&copy;조각보</footer>
      </body>
    </html>
  );
};

export default RootLayout;
