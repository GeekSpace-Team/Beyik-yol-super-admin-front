import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ru: {
    translation: {
      cars_page: "Awtoulaglar",
      user_name: "Imya polzovotelya",
      unreadNote: "У вас есть 7 нерпрочитанное письмо",
      delete: "Удалить",
      edit: "Редактироваь",
      fullInfo: "Польное информация",
      PENDING: "Ozidaniya",
      ACTIVE: "Aktive",
      RUNNING: "Rabotayet",
      CANCELED: "Otmenen",
      REJECTED: "Otmen",
      WARNING: "Produprjdeniya",
      ERRORED: "Osibka",
      PAUSED: "Pausa",
      HIDDEN: "Skryta",
      NONE: "Nichego",
      BANNER: "Banner",
      HOME_LARGE: "Bolshoy Dom",
      HOME_MINI: "Mini Dom",
      IN_LIST: "V Liste",
      IN_VIEW: "V Vyu",
      POPUP: "Pop up",
      cars: "Автомобиль",
      user: "Ползователь",
      close: "Закрыть",
    },
  },

  tm: {
    translation: {
      cars_page: "Awto",
      user_name: "Ulanyjy ady",
      unreadNote: "Sizin 7 sany okalmadyk hatynyz  bar",
      delete: "Pozmak",
      edit: "Üýtgetmek",
      fullInfo: "Doly maglumat",
      PENDING: "Garasylyar",
      ACTIVE: "Active",
      RUNNING: "Isjen",
      CANCELED: "Yza gaytarylan",
      REJECTED: "Yza gaytarmak",
      WARNING: "Duydurysh",
      ERRORED: "Yalnyshlyk",
      PAUSED: "Pause",
      HIDDEN: "Gizlin",
      NONE: "Hicisi",
      BANNER: "Banner",
      HOME_LARGE: "Ullakan oy",
      HOME_MINI: "Mini Oy",
      IN_LIST: "Listdakiler",
      IN_VIEW: "Wyudakiler",
      POPUP: "Pop up",
      cars: "Awtoulaglar",
      user: "Ulanyjy",
      clode: "Ýapmak",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "tm",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
