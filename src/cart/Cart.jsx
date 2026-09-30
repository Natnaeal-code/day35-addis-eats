import { Link } from "react-router-dom";
import { useCartStore } from "./cartStore.js";

function Cart() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );
  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const total = items.reduce(
    (sum, dish) => sum + dish.price,
    0
  );

  if (items.length === 0) {
    return (
      <section>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/menu">Browse the menu</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Your Cart</h1>

      {items.map((dish, index) => (
        <article key={`${dish.id}-${index}`}>
          <h3>{dish.name}</h3>
          <p>{dish.price} ETB</p>

          <button onClick={() => removeFromCart(dish.id)}>
            Remove
          </button>
        </article>
      ))}

      <h2>Total: {total} ETB</h2>

      <button onClick={clearCart}>Clear cart</button>

      <p>
        <Link to="/checkout">Proceed to checkout</Link>
      </p>
    </section>
  );
}

export default Cart;