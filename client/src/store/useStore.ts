import { create } from 'zustand';

interface StoreState {
  categories: string[];
  setCategories: (cats: string[]) => void;
  searchResults: any[];
  setSearchResults: (results: any[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  categories: [],
  setCategories: (cats) => set({ categories: cats }),
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
}));
