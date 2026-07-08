export type Forms = 'alcove' | 'panel_van' | 'integrated' | 'semi_integrated';

export type Transmissions = 'automatic' | 'manual';

export type Engines = 'diesel' | 'petrol' | 'hybrid' | 'electric';

export interface Gallery {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  description: string;
  form: Forms;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: Transmissions;
  engine: Engines;
  amenities: string[];
  coverImage: string;
  gallery: Gallery[];
  createdAt: string;
  updatedAt: string;
}

export interface CampersCatalog {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}

export interface Reviews {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

export interface CamperFilters {
  forms: Forms[];
  transmissions: Transmissions[];
  engines: Engines[];
}

export interface BookingRequestPayload {
  name: string;
  email: string;
}

export interface BookingRequestResponse {
  message: string;
}
