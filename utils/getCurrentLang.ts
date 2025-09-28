import { Bio } from "@/interfaces";

export const getCurrentLang = (bio: Bio, lang: string): string | null => {
  switch (lang) {
    case "uz":
      return bio.bio_uz;
    case "ru":
      return bio.bio_ru;
    case "en":
      return bio.bio_en;
    default:
      return bio.bio_en; // fallback
  }
};
