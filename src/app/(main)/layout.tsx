import "@/styles/globals.css";
import type { Metadata } from "next";
import AuthSessionProvider from "@/components/SessionProvider";
import { MainHeader } from "@/components/header";
import Footer from "@/components/footer";
import { SUITFont } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "조각보",
  description: "작은 기억의 조각들로 추억을 떠올려요.",
  icons: {
    icon: "/images/jogak-icon.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  addAlbumModal: React.ReactNode;
  addMateModal: React.ReactNode;
  albumDetailModal: React.ReactNode;
}

const RootLayout = async ({
  children,
  addAlbumModal,
  addMateModal,
  albumDetailModal,
}: RootLayoutProps) => {
  return (
    <html lang="en" className={`${SUITFont.variable}`}>
      <body>
        <AuthSessionProvider>
          <MainHeader />
          <main className="w-inner h-[calc(100vh-80px)] mx-auto">
            {children}
            {addAlbumModal}
            {addMateModal}
            {albumDetailModal}
          </main>
          {/* <Footer /> */}
        </AuthSessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
