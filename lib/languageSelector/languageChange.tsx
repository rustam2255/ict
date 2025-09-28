"use client";
import { useTranslation } from "react-i18next";
import { Menu } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
const languages = [
  { code: "en", name: "EN", countryCode: "GB" },
  { code: "ru", name: "RU", countryCode: "RU" },
  { code: "uz", name: "UZ", countryCode: "UZ" },
];
export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang =
    languages.find((lang) => i18n.language.startsWith(lang.code)) || languages[0];
  const handleChangeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center gap-2 px-3 py-2 ">
        <ReactCountryFlag
          countryCode={currentLang.countryCode}
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
        <span className="">{currentLang.name}</span>
        <ChevronDown className="w-4 h-4 t" />
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-28 origin-top-right bg-white border rounded-lg shadow-lg z-50">
        {languages.map((lang) => (
          <Menu.Item key={lang.code}>
            {({ active }) => (
              <button
                onClick={() => handleChangeLanguage(lang.code)}
                className={`flex items-center gap-2 w-full px-3 py-2 text-sm ${
                  active ? "bg-gray-100" : ""
                }`}
              >
                <ReactCountryFlag
                  countryCode={lang.countryCode}
                  svg
                  style={{ width: "1.5em", height: "1.5em" }}
                />
                <span className="text-black">{lang.name}</span>
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
