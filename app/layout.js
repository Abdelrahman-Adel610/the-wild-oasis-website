import "./globals.css";
import { Josefin_Sans } from "next/font/google";
export const metadata = {
  title: {
    template: "The wild oasis | %s",
    default: "The wild oasis | Home",
  },
  description: "website for booking awesome cabins",
};
const font = Josefin_Sans({ display: "swap", subsets: ["latin"] });
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>{children}</body>
    </html>
  );
}
