import { create } from "zustand";

export const useCartStore = create((set) => ({
  items: [],

  addToCart: (dish) =>
    set((state) => ({
      items: [...state.items, dish],
    })),

  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((dish) => dish.id !== id),
    })),

  clearCart: () =>
    set({
      items: [],
    }),
}));