import "@/styles/globals.css";
import type { Metadata } from "next";
import AuthSession from "@/components/SessionProvider";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "조각보",
  description: "작은 기억의 조각들로 추억을 떠올려요.",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AuthSession>
          <Header />
          <main className="w-3/4 mx-auto">{children}</main>
          <Footer />
        </AuthSession>
      </body>
    </html>
  );
};

export default RootLayout;
