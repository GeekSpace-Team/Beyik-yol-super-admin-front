import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  ru: {
    translation: {
      cars_page: "Awtoulaglar",
      user_name: "Imya polzovotelya",
      // Success:"ustunlikli amala asyryldy"

      // Item status translation section starts here ..........................................................
      PENDING: "Ozidaniya",
      ACTIVE: "Aktive",
      RUNNING: "Rabotayet",
      CANCELED: "Otmenen",
      REJECTED: "Otmen",
      WARNING: "Produprjdeniya",
      ERRORED: "Osibka",
      PAUSED: "Pausa",
      HIDDEN: "Skryta",
      // Item status translation section ends here ............................................................

      //
      // Ads status translation section starts here ...........................................................
      NONE: "Nichego",
      BANNER: "Banner",
      HOME_LARGE: "Bolshoy Dom",
      HOME_MINI: "Mini Dom",
      IN_LIST: "V Liste",
      IN_VIEW: "V Vyu",
      POPUP: "Pop up",
      // Ads status translation section starts here ...........................................................
      //
      // sidebar translation words section starts here .........................................................
      cars: "Автомобиль",

      // sidebar translation words section ends here ...........................................................

      // user page translation words section starts here .......................................................
      user: "Ползователь",
      // user page translation words section ends here .........................................................
    },
  },
  tm: {
    translation: {
      cars_page: "Awto",
      user_name: "Ulanyjy ady",
      //
      // Item status translation section starts here ..........................................................
      PENDING: "Garasylyar",
      ACTIVE: "Active",
      RUNNING: "Isjen",
      CANCELED: "Yza gaytarylan",
      REJECTED: "Yza gaytarmak",
      WARNING: "Duydurysh",
      ERRORED: "Yalnyshlyk",
      PAUSED: "Pause",
      HIDDEN: "Gizlin",
      // Item status translation section ends here ............................................................
      //
      //
      // Ads status translation section starts here ...........................................................
      NONE: "Hicisi",
      BANNER: "Banner",
      HOME_LARGE: "Ullakan oy",
      HOME_MINI: "Mini Oy",
      IN_LIST: "Listdakiler",
      IN_VIEW: "Wyudakiler",
      POPUP: "Pop up",
      // Ads status translation section starts here ...........................................................
      //

      // sidebar translation words section starts here .........................................................
      cars: "Awtoulaglar",
      // sidebar translation words section ends here ...........................................................

      // user page translation words section starts here .......................................................
      user: "Ulanyjy",
      // user page translation words section ends here .........................................................
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "tm", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
