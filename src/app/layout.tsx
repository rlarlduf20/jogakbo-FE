import "@/styles/globals.css";
import type { Metadata } from "next";
import AuthSessionProvider from "@/components/provider/SessionProvider";
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
        <AuthSessionProvider>
          <Header />
          <main className="w-inner mx-auto">{children}</main>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
