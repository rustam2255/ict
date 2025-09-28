"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePostContactMutation } from "@/service/api";
import ContactForm from "@/utils/postcontact";

const ContactSection = () => {
  const { t } = useTranslation();
  const [postContact, { isLoading, isSuccess, isError }] = usePostContactMutation();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postContact(formData).unwrap();
      alert(t("contactpage.success_message"));
      setFormData({ fullname: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Xatolik:", err);
      alert(t("contactpage.error_message"));
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center xl:mt-40 px-4 md:px-0">
      <div className="w-full relative flex flex-col items-start md:items-end">

        {/* Desktop Rectangle */}
        <div
          className="w-full min-w-[1317px] min-h-[605px] rounded-[30px] flex-col hidden justify-end self-start xl:flex"
          style={{
            backgroundImage: "url('/rectangle.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="font-sfpro font-bold text-[44px] leading-[60px] bg-gradient-to-b from-[#0B2234] to-[#1D573B] bg-clip-text text-transparent ml-[131px]">
            {t("contactpage.title")}
          </p>
          <p className="font-circular font-normal text-[20px] leading-[30px] bg-gradient-to-b from-[#0B2234] to-[#1D573B] bg-clip-text text-transparent ml-[131px] xl:max-w-[400px]">
            {t("contactpage.descr")}
          </p>
          <div className="ml-[131px] mt-4 w-[284px] h-[284px] relative">
            <Image src={"/logo.png"} alt="Logotip" fill className="object-contain" />
          </div>
        </div>

        {/* Desktop Form */}
        <div className="absolute top-[-80px] hidden left-[620px] w-[584px] xl:flex">
          <ContactForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
            t={t}
            className="h-[620px]"
          />
        </div>

        {/* Mobile Rectangle */}
        <div className="w-full xl:hidden min-h-[300px] rounded-md  flex flex-col justify-end self-start mt-6 bg-white">
          <p className="font-sfpro font-bold text-[24px] leading-[32px] bg-gradient-to-b from-[#0B2234] to-[#1D573B] bg-clip-text text-transparent ml-4 mt-4">
            {t("contactpage.title")}
          </p>
          <p className="font-circular font-normal text-[16px] leading-[22px] bg-gradient-to-b from-[#0B2234] to-[#1D573B] bg-clip-text text-transparent ml-4 mt-2">
            {t("contactpage.descr")}
          </p>
          <div className="ml-4 mt-4 w-[120px] h-[120px] relative">
            <Image src={"/logo.png"} alt="Logotip" fill className="object-contain" />
          </div>
        </div>

        {/* Mobile Form */}
        <div className="w-full xl:hidden mt-4">
          <ContactForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
            t={t}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
