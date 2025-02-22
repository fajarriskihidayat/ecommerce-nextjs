import { TCart } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartState {
  products: TCart[];
  addProduct: (cart: TCart) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  removeProduct: (id: number) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (cart) =>
        set({
          products: [
            ...get().products.filter((item) => item.id !== cart.id),
            cart,
          ],
        }),
      incrementQuantity: (id) => {
        const newProducts = get().products.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }

          return item;
        });

        set({
          products: newProducts,
        });
      },
      decrementQuantity: (id) => {
        const newProducts = get().products.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }

          return item;
        });

        set({
          products: newProducts.filter((item) => item.quantity !== 0),
        });
      },
      removeProduct: (id) =>
        set({
          products: [...get().products.filter((item) => item.id !== id)],
        }),
    }),
    {
      name: "cart-product-ecommerce",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
