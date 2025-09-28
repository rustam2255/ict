"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "../../locales/en.json";
import translationUz from "../../locales/uz.json";
import translationRu from "../../locales/ru.json";

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: { translation: translationEn },
      uz: { translation: translationUz },
      ru: { translation: translationRu },
    },
    fallbackLng: "uz",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage", "cookie"]
    }
  });

export default i18n;
