import { create } from 'zustand';
import type { Forms, Engines, Transmissions, Filters } from '@/types/types';

interface FilterState {
  location: string;
  form: Forms | '';
  engine: Engines | '';
  transmission: Transmissions | '';
  resetKey: number;
  setFilters: (filters: Filters) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>(set => ({
  location: '',
  form: '',
  engine: '',
  transmission: '',
  resetKey: 0,
  setFilters: filters => set(filters),
  clearFilters: () =>
    set(state => ({
      location: '',
      form: '',
      engine: '',
      transmission: '',
      resetKey: state.resetKey + 1,
    })),
}));
