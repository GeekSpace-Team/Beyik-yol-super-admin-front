import { BASE_URL } from "../api/AxiosInstance";

const startUrl: string = "http://192.168.97.125:6967";
const brand = "/car/car-brand/";
const car = "/car/image/";
const adsImage = "/car/ads/";
const image = "/users/images/";

export enum ImageType {
  Brand = "brand",
  Car = "car",
  Ads = "adsImage",
  User = "image",
}

const getByType = (type: string): string => {
  if (type === ImageType.Brand) {
    return brand;
  }
  if (type === ImageType.Car) {
    return car;
  }
  if (type === ImageType.Ads) {
    return adsImage;
  }
  if (type === ImageType.User) {
    return image;
  }
  return "";
};

export const getImageUrl = (url: string, type: ImageType): string => {
  return startUrl + getByType(type) + url;
};

export type IFiles = {
  id: number;
  url: string;
  parent_id: number;
  mime_type: number;
  created_at: string;
  updated_at: string;
};

export function convertToDate(value: string): string {
  let val = new Date(value);
  return `${val.getFullYear()}-${val.getMonth()}-${val.getDate()}`;
}
