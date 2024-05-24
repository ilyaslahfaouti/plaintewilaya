import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
const resources = {
  en: {
    translation: {
      hello: "Hello",
      welcome: "Welcome to our website.",
    },
  },
  es: {
    translation: {
      hello: "Hola",
      welcome: "Bienvenido a nuestro sitio web.",
    },
  },
  fr: {
    translation: {
      hello: "Bonjour",
      welcome: "Bienvenue sur notre site Web.",
    },
  },
  // Add more languages as needed
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // Default language
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
