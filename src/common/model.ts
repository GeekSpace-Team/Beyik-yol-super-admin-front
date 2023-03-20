export interface Model {
  id: number;
  name: string;
  brandId: number;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  statusValue: string;
}

export interface Brand {
  id: number;
  name: string;
  image: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  models: Model[];
}

export interface Option {
  id: number;
  name_tm: string;
  name_ru: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Engine {
  id: number;
  name_tm: string;
  name_ru: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transmition {
  id: number;
  name_tm: string;
  name_ru: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AllCarsImage {
  id: number;
  url: string;
  status: string;
  type: string;
  carId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Users {
  id: number;
  fullname: string;
  phonenumber: string;
  username: string;
  password: string;
  dob: Date;
  status: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface AllCars {
  id: number;
  name: string;
  status: string;
  modelId: number;
  optionId: number;
  engineTypeId: number;
  enginePower: number;
  transmitionId: number;
  year: number;
  lastMile: number;
  vinCode: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  usersId: number;
  images: AllCarsImage[];
  carModel: Model;
  carTransmition: Transmition;
  carOption: Option;
  carEngineType: Engine;
  users: Users;
  costChange: Cost[];
}

//

export interface Users {
  id: number;
  fullname: string;
  phonenumber: string;
  username: string;
  password: string;
  dob: Date;
  status: string;
  image: string;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  cars: AllCars[];
  Events: Events[];
  LoginHistory: LoginHistory[];
  FCMToken: FCMToken[];
  carShare: CarShare[];
}

export interface Events {
  id: number;
}

export interface LoginHistory {
  id: number;
}

export interface FCMToken {
  id: number;
}

export interface CarShare {
  id: number;
}

export interface Regions {
  id: number;
  name_tm: string;
  name_ru: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  subRegion: SubRegionI[];
}

export interface SubRegionI {
  id: number;
  name_tm: string;
  name_ru: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  regionId: number;
}

export interface ConstantI {
  id: number;
  name_tm: string;
  name_ru: string;
  createdAt: string;
  updatedAt: string;
  content_tm: string;
  content_ru: string;
  type: string;
}

export interface EvacuatorI {
  id: number;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
  subRegionId: number;
  status: string;
  description: string;
  subRegion: SubRegionI;
}

export interface PriceI {
  id: number;
  title: string;
  value: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface TypesI {
  device: string[];
  loginType: string[];
  eventType: string[];
  pageType: string[];
  priceType: string[];
  objectPermissions: string[];
  adsStatus: string[];
  itemStatus: string[];
  userStatus: string[];
  objectStatus: string[];
  objectType: string[];
  imageType: string[];
  permissions: string[];
  constantType: string[];
}

export interface AdsImage {
  id: number;
  url: string;
  type: string;
  status: string;
  adsId: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdsI {
  id: number;
  titleTm: string;
  titleRu: string;
  index: number;
  status: string;
  adsType: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  adsImage: AdsImage[];
  statusValue: string;
}

export interface PusherI {
  id: number;
  titleTm: string;
  titleRu: string;
  messageTm: string;
  messageRu: string;
  userId: number;
  isRead: boolean;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserI {
  id: number | null;
  fullname: string;
  phonenumber: string;
  username: string;
  password: string;
  dob: string;
  status: string;
  image: string;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  cars: AllCars[];
}

export interface SendAllInboxI {
  id: number;
  titleTm: string;
  titleRu: string;
  messageTm: string;
  messageRu: string;
  userId: any;
  isRead: false;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface Cost {
    id:          number;
    mile:        number;
    price:       number;
    description: string;
    nextMile:    number;
    volume:      number;
    reminder:    boolean;
    carId:       number;
    costType:    string;
    createdAt:   Date;
    updatedAt:   Date;
}


export enum CostType {
  CHANGE='CHANGE',
  REPAIR='REPAIR',
  FUEL='FUEL'
}