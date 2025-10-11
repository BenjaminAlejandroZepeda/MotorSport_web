import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  
  addToCart: (vehicle) => {
    set((state) => {

      const existingIndex = state.cart.findIndex(v => v.id === vehicle.id);
      
      if (existingIndex >= 0) {

        const updatedCart = [...state.cart];
        updatedCart[existingIndex].quantity = Math.min(updatedCart[existingIndex].quantity + 1, 10);
        return { cart: updatedCart };
      } else {

        return { cart: [...state.cart, { ...vehicle, quantity: 1 }] };
      }
    });
  },

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(v => v.id !== id)
  })),

  updateQuantity: (id, qty) => set((state) => ({
    cart: state.cart.map(v => 
      v.id === id ? { ...v, quantity: Math.min(Math.max(qty, 1), 10) } : v
    )
  })),

  clearCart: () => set({ cart: [] }),
}));
