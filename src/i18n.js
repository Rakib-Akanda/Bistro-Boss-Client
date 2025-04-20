import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "home": "Home",
      "about": "About Us",
     " contact": "Contact",
      "language": "Language",
    },
  },
  bn: {
    translation: {
      "HOME": "হোম",
      "ABOUT": "আমাদের সম্পর্কে",
      "CONTACT US": "যোগাযোগ",
      "OUR MENU": "আমাদের মেনু",
      "DASHBOARD": "ড্যাশবোর্ড",
      "ORDER FOOD": "অর্ডার"
    },
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector) // Language auto detect
  .init({
    resources,
    fallbackLng: "en", // যদি ভাষা না মেলে তাহলে ইংরেজি হবে
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
