import "./globals.css";
import type { Metadata } from "next";
import AuthSession from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "조각보",
  description: "작은 기억의 조각들로 추억을 떠올려요.",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AuthSession>
          <header className="w-full">
            <Navbar />
          </header>
          <main>{children}</main>
          <footer className="border-t-2 border-black-500 pt-3 mt-80">
            &copy;조각보
          </footer>
        </AuthSession>
      </body>
    </html>
  );
};

export default RootLayout;
