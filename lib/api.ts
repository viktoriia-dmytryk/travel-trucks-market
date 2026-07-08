import type { CampersCatalog } from '@/types/types';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://campers-api.goit.study',
});

export const getCampersCatalog = async (
  page: number = 1,
  perPage: number = 4
): Promise<CampersCatalog> => {
  const { data } = await api.get<CampersCatalog>('/campers', {
    params: { page, perPage },
  });
  return data;
};
