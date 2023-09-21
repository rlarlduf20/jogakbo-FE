import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "조각보",
  description: "작은 기억의 조각들로 추억을 되살려봐요.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
