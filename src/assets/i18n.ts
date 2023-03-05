import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ru: {
    translation: {
      cars_page: "Awtoulaglar",
      user_name: "Пользователь",
      image: "Картина",
      carModel: "Модель автомобиля",
      addModel: "Добавить Модель",
      carYear: "Год выпуска автомобиля",
      status: "Cтатус",
      unreadNote: "У вас есть 7 нерпрочитанное письмо",
      delete: "Удалить",
      edit: "Редактироваь",
      fullname: "Полное имя",
      phoneNumber: "Номер телефона",
      date: "Дата",
      blocked: "Блокировать",
      unBlock: "Разблокировать",
      fullInfo: "Польное информация",
      cars: "Автомобиль",
      user: "Ползователь",
      close: "Закрыть",
      desc: "Описание",
      addBrand: "Добавить Бренд",
      uploadImg: "Загрузить изображение",
      clear: "Очистить",
      save: "Сохранять",
      titleName: "Название Заголовка",
    },
  },

  tm: {
    translation: {
      cars_page: "Awto",
      user_name: "Ulanyjy ady",
      image: "Image",
      carModel: "Awtoulag modeli",
      addModel: "Model Goşuň",
      status: "Status",
      carYear: "Awtoulag ýyly",
      unreadNote: "Sizin 7 sany okalmadyk hatynyz  bar",
      delete: "Pozmak",
      edit: "Redaktirläň",
      fullname: "Doly ady",
      phoneNumber: "Telefon belgisi",
      date: "Sene",
      blocked: "Blok",
      unBlock: "Açmak",
      fullInfo: "Doly maglumat",
      cars: "Awtoulaglar",
      user: "Ulanyjy",
      clode: "Ýapmak",
      desc: "Düşündiriş",
      addBrand: "Marka Goşuň",
      uploadImg: "Suraty ýükläň",
      clear: "Arassala",
      save: "Saklaň",
      titleName: "Title Ady",
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
