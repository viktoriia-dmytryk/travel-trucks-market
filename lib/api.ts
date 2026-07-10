import type {
  Camper,
  CampersCatalog,
  Forms,
  Transmissions,
  Engines,
  CamperFilters,
  Reviews,
} from '@/types/types';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://campers-api.goit.study',
});

export interface CampersQueryParams {
  page?: number;
  perPage?: number;
  location?: string;
  form?: Forms;
  transmission?: Transmissions;
  engine?: Engines;
}

export const getCampersCatalog = async (params: CampersQueryParams) => {
  const { data } = await api.get<CampersCatalog>('/campers', {
    params,
  });

  return data;
};

export const getCamperById = async (id: string) => {
  const { data } = await api.get<Camper>(`/campers/${id}`);
  return data;
};

export const getCategories = async () => {
  const { data } = await api.get<CamperFilters>('/campers/filters');
  return data;
};

export const getReviews = async (id: string) => {
  const { data } = await api.get<Reviews[]>(`/campers/${id}/reviews`);
  return data;
};
