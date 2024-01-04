import "@/styles/globals.css";
import type { Metadata } from "next";
import AuthSessionProvider from "@/components/SessionProvider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { SUITFont } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "조각보",
  description: "작은 기억의 조각들로 추억을 떠올려요.",
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const RootLayout = async ({ children, modal }: RootLayoutProps) => {
  return (
    <html lang="en" className={`${SUITFont.variable}`}>
      <body>
        <AuthSessionProvider>
          <Header />
          <main className="w-inner mx-auto">
            {children}
            {modal}
          </main>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
