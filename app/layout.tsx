
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ChildProps } from "@/types";
import { ReduxProvider } from "@/store/provider";
import { I18nProvider } from "@/lib/i18n/i18nProvider";




const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin-ext']
})


export const metadata: Metadata = {
  metadataBase: new URL('https://ictacademy.uz'),
  title: 'ICT akademiyasi',
  description:
    'ICT Akademiyasi – zamonaviy IT texnologiyalari bo‘yicha 7 yillik tajribaga ega o‘quv markazi. Yoshlarni global IT bozorida muvaffaqiyatli mutaxassisga aylantiramiz.',
  authors: [{ name: 'Rustam Abduraximov', url: 'https://ictacademy.uz' }],
  icons: { icon: '/logo.png' },
  keywords:
    "dasturlash kurslari, dasturlashga oid darslar, reactjs uzbek tilida, vuejs uzbek tilida, redux uzbek tilida, sammi, sammi academy, bepul dasturlash, rezyume yozish, portfolio, javascript, raqamli avlod, javascript, reactjs, vuejs, javascript darslari, reactjs darslari, vuejs darslari, dasturlash darslari, o'zbek tilida dasturlash, backend, backend kurslari,  ish, o'zbekistonda ishlar dasturchilar uchun juniolar uchun ish juniro dasturchilar uchun vakansiyalar reactjs o'zbek tilida, reactjs darslari o'zbek tilida, javascript darslari, javascript darslari o'zbek tilida, dasturash darslari o'zbek tilida, dasturlashni o'rganish, dasturlash, IT loyihalar o'zbek tilida",
  openGraph: {
    title: 'ICT akademiyasi',
    description:
      'ICT Akademiyasi – zamonaviy IT texnologiyalari bo‘yicha 7 yillik tajribaga ega o‘quv markazi. Yoshlarni global IT bozorida muvaffaqiyatli mutaxassisga aylantiramiz.',
    type: 'website',
    url: 'https://ictacademy.uz',
    locale: 'uz_Uz',
    images: ['/images/hero_courses.png'],
    countryName: 'Uzbekistan',
    siteName: 'Rustik',
    emails: 'rustamabduraximov140@gmail.com',
  },
}


export default function RootLayout({ children }: ChildProps) {

  return (
    <html lang='uz'>
      <body
        className={` ${dmSans.variable} antialiased overflow-x-hidden`}
      >
        <ReduxProvider>
          <I18nProvider>
            {children}
          </I18nProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
