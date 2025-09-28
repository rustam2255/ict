import React from "react";

interface ContactFormProps {
  formData: {
    fullname: string;
    email: string;
    phone: string;
    message: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  t: (key: string) => string;
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  onChange,
  onSubmit,
  isLoading,
  isError,
  isSuccess,
  t,
  className = "",
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col items-center justify-center gap-10 shadow-xl bg-white rounded-md p-6 w-full ${className}`}
    >
      <input
        name="fullname"
        value={formData.fullname}
        onChange={onChange}
        type="text"
        placeholder={t("contactpage.name")}
        required
        className={`h-[50px] px-4 text-black w-full rounded-[5px] border-2 ${isError ? "border-red-500" : "border-gray-400"}`}
      />
      <input
        name="email"
        value={formData.email}
        onChange={onChange}
        type="email"
        placeholder={t("contactpage.email")}
        required
        className={`h-[50px] px-4 text-black w-full rounded-[5px] border-2 ${isError ? "border-red-500" : "border-gray-400"}`}
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={onChange}
        type="text"
        placeholder={t("contactpage.phone")}
        required
        className={`h-[50px] px-4 text-black w-full rounded-[5px] border-2 ${isError ? "border-red-500" : "border-gray-400"}`}
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={onChange}
        placeholder={t("contactpage.message")}
        required
        className={`h-[100px] p-4 text-black rounded-[5px] w-full border-2 resize-none ${isError ? "border-red-500" : "border-gray-400"}`}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-[155px] h-[50px] cursor-pointer rounded-[10px] bg-gradient-to-l from-[#3EFEA1] to-[#259860] text-white disabled:opacity-50"
      >
        {isLoading ? t("contactpage.sending") : t("contactpage.btn")}
      </button>
      {isSuccess && <p className="text-green-600">{t("contactpage.success_message")}</p>}
      {isError && <p className="text-red-600">{t("contactpage.error_message")}</p>}
    </form>
  );
};

export default ContactForm;
