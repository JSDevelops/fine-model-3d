import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "FINE Model 3D AR+AI Platform",
  description: "แพลตฟอร์มการเรียนรู้ภาษาอังกฤษเพื่ออาชีพ ด้วยเทคโนโลยี AR ร่วมกับ AI และ Simulation-Based Learning",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="th"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        {/* Load FontAwesome CDN for rich icons compatibility */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="min-h-full bg-[#050811] text-white flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
