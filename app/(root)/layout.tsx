// app/(root)/layout.tsx
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import { Metadata } from "next";
import { ChildProps } from "@/types";
import Test from "./_components/test";

export const metadata: Metadata = {
  metadataBase: new URL('https://ictacademy.uz'),
  title: 'ICT Akademiyasi',
  description: 'ICT Akademiyasi – zamonaviy IT texnologiyalari bo‘yicha 7 yillik tajribaga ega o‘quv markazi. Yoshlarni global IT bozorida muvaffaqiyatli mutaxassisga aylantiramiz.',
  authors: [{ name: 'Rustam Abduraximov', url: 'https://ictacademy.uz' }],
  icons: { icon: '/logo.png' },
  keywords: "dasturlash kurslari, ict academy, toshkenda dasturlash kurslari, reactjs uzbek tilida, vuejs uzbek tilida, javascript, backend, IT loyihalar o'zbek tilida",
  openGraph: {
    title: 'ICT Akademiyasi',
    description: 'ICT Akademiyasi – zamonaviy IT texnologiyalari bo‘yicha 7 yillik tajribaga ega o‘quv markazi.',
    type: 'website',
    url: 'https://ictacademy.uz',
    locale: 'uz_UZ',
    images: ["/images/hero_courses.png"], // public papkadan rasm
    siteName: 'Rustik',
  },
};

export default function Layout({ children }: ChildProps) {
  return (
    <main>
      <Navbar />
      <Test />
      <div className="overflow-x-hidden">{children}</div>
      <Footer />
    </main>
  );
}
