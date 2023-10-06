import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Trang chủ": "Home",
      "Liên hệ": "Contact",
      "Tin tức": "News",
      "Cụm rạp": "Theater cluster",
      "Đăng nhập": "Sign in",
      "Đăng ký": "Sign up",
    },
  },
  chi: {
    translation: {
      "Trang chủ": "主页",
      "Liên hệ": "接觸",
      "Tin tức": "新聞",
      "Cụm rạp": "劇院群",
      "Đăng nhập": "登錄",
      "Đăng ký": "報名",
    },
  },
  vi: {
    translation: {
      "Trang chủ": "Trang chủ",
      "Liên hệ": "Liên hệ",
      "Tin tức": "Tin tức",
      "Cụm rạp": "Cụm rạp",
      "Đăng nhập": "Đăng nhập",
      "Đăng ký": "Đăng ký",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "vi", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
