"use client";

import { useForm } from "react-hook-form";

import { useState } from "react";
import { usePostContactMutation } from "@/service/api";

interface ContactFormInputs {
  name: string;
  email: string;
  phone: string
  message: string;
}

export default function ContactForm() {
  const [postContact, { isLoading }] = usePostContactMutation();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const onSubmit = async (data: ContactFormInputs) => {
    try {
      await postContact(data).unwrap();
      setSuccess(true);
      reset();
    } catch (err) {
      console.error("Yuborishda xato:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Biz bilan bog‘laning</h2>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          Xabaringiz muvaffaqiyatli yuborildi!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Ism</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            {...register("name", { required: "Ism kiritish shart" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            {...register("email", {
              required: "Email kiritish shart",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "To‘g‘ri email manzil kiriting",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 font-medium">Xabar</label>
          <textarea
            rows={4}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            {...register("message", {
              required: "Xabar yozish shart",
              minLength: {
                value: 10,
                message: "Xabar kamida 10 ta belgidan iborat bo‘lishi kerak",
              },
            })}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? "Yuborilmoqda..." : "Yuborish"}
        </button>
      </form>
    </div>
  );
}
