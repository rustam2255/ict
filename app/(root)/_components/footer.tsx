'use client'
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const {t} = useTranslation()
  return (
    <footer className="bg-gradient-to-b from-[#0B2234] to-[#1D573B] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Logo + Description */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/">
              <Image
                src="/logolight.png"
                alt="Logo"
                width={97}
                height={97}
                className="w-[70px] h-[70px] lg:w-[97px] lg:h-[97px]"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-200 max-w-md">
              {t("footer.descr")}
            </p>
          </div>

          {/* Right side container */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Get in Touch */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">{t("footer.address")}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-green-400 flex-shrink-0" />
                  <p className="text-sm text-gray-200 whitespace-nowrap">
                    7A, Bog`ishamol, Yunusobod, Toshkent
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-green-400 flex-shrink-0" />
                  <p className="text-sm text-gray-200">@ictacademy_official</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-green-400 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-gray-200 mt-1">998 (88) 333 88 09</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Time */}
            <div className="space-y-4 ">
              <h3 className="text-lg font-semibold text-white mb-4">{t("footer.time")}</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-200">Mon-Sat: 09:00AM – 09:00PM</p>
                <p className="text-sm text-gray-200">Sunday: 10:00AM – 4:00PM</p>
              </div>
            </div>

            {/* Social Network */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">{t("footer.net")}</h3>
              <div className="flex gap-3">
                <Link href="https://t.me/ictacademy_uz" className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Twitter size={16} className="text-white" />
                </Link>
                <Link href="#" className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Facebook size={16} className="text-white" />
                </Link>
                <Link href="#" className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center hover:bg-blue-800 transition-colors">
                  <Linkedin size={16} className="text-white" />
                </Link>
                <Link href="#" className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Instagram size={16} className="text-white" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
