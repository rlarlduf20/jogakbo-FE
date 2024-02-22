import "@/styles/globals.css";
import type { Metadata } from "next";
import AuthSessionProvider from "@/components/SessionProvider";
import { SUITFont } from "@/lib/fonts";
import { LandingHeader } from "@/components/header";

export const metadata: Metadata = {
  title: "조각보",
  description: "작은 기억의 조각들로 추억을 떠올려요.",
  icons: {
    icon: "/images/jogak-icon.png",
  },
};

interface LandingLayoutProps {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: LandingLayoutProps) => {
  return (
    <html lang="en" className={`${SUITFont.variable}`}>
      <body>
        <AuthSessionProvider>
          <LandingHeader />
          <main className="w-inner min-h-[100vh] mx-auto">{children}</main>
        </AuthSessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
