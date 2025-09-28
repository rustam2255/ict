import React from 'react'
import ContactSection from '../(home)/home-components/contact'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Contact Us - ICT Akademiyasi',
  description: 'Biz bilan bog‘laning va savollaringizni yuboring. ICT Akademiyasi jamoasi sizga tezkor javob beradi.',
}


const ContactPage = () => {
  return (
    <div className='w-[90%] mx-auto'>
      <ContactSection />
    </div>
  )
}

export default ContactPage