import { Faustina } from "next/font/google";
import "./globals.css";

const faustina = Faustina({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"] 
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={faustina.className}>{children}</body>
    </html>
  );
}
