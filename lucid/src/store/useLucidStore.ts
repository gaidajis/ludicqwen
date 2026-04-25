import { create } from 'zustand';
import type { LucidStore, LucidItem, TierCategory } from '../types';
import { initialData } from '../data/initialData';

export const useLucidStore = create<LucidStore>((set) => ({
  items: initialData,
  editMode: false,
  activeFilter: { modality: 'all', budget: 'all' },
  activeTier: null,

  addItem: (item) => {
    const id = Date.now() + '-' + Math.random().toString(36).slice(2);
    set((state) => ({
      items: [...state.items, { ...item, id }],
    }));
  },

  updateItem: (id, updates) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  },

  deleteItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  toggleEditMode: () => {
    set((state) => ({ editMode: !state.editMode }));
  },

  setFilter: (type, value) => {
    set((state) => ({
      activeFilter: { ...state.activeFilter, [type]: value },
    }));
  },

  setActiveTier: (tier) => {
    set({ activeTier: tier });
  },
}));
