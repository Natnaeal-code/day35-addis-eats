import { createContext, useContext, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addToCart(dish) {
    setItems((currentItems) => [...currentItems, dish]);
  }

  function removeFromCart(id) {
    setItems((currentItems) =>
      currentItems.filter((dish) => dish.id !== id)
    );
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, dish) => sum + dish.price, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}