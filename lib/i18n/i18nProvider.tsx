"use client";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import React from "react";
export function I18nProvider({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <React.Suspense fallback={<div>Loading translations...</div>}>
        {children}
      </React.Suspense>
    </I18nextProvider>
  );
}
