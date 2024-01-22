import "@/styles/globals.css";
import type { Metadata } from "next";
import AuthSessionProvider from "@/components/SessionProvider";
import { SUITFont } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "조각보",
  description: "작은 기억의 조각들로 추억을 떠올려요.",
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const AlbumRootLayout = async ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className={`${SUITFont.variable}`}>
      <body>
        <AuthSessionProvider>
          <main className="w-inner mx-auto">{children}</main>
        </AuthSessionProvider>
      </body>
    </html>
  );
};

export default AlbumRootLayout;
