import localFont from "next/font/local";

export const SUITFont = localFont({
  src: [
    { path: "../../public/fonts/SUIT-Light.woff2", weight: "300" },
    { path: "../../public/fonts/SUIT-Regular.woff2", weight: "400" },
    { path: "../../public/fonts/SUIT-Medium.woff2", weight: "500" },
    { path: "../../public/fonts/SUIT-SemiBold.woff2", weight: "600" },
    { path: "../../public/fonts/SUIT-Bold.woff2", weight: "700" },
  ],
  variable: "--font-SUIT",
});
