import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Logo from "@/app/_components/Logo";
import Header from "@/app/_components/Header";
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
      <body
        className={`${font.className}  antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
