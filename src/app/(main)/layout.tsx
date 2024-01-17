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
  addAlbumModal: React.ReactNode;
  addMateModal: React.ReactNode;
}

const RootLayout = async ({
  children,
  addAlbumModal,
  addMateModal,
}: RootLayoutProps) => {
  return (
    <html lang="en" className={`${SUITFont.variable}`}>
      <body>
        <AuthSessionProvider>
          <Header />
          <main className="w-inner mx-auto">
            {children}
            {addAlbumModal}
            {addMateModal}
          </main>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
