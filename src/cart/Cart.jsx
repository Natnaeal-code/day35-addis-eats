import { Link } from "react-router-dom";
import { useCart } from "./CartContext.jsx";

function Cart() {
  const {
    items,
    removeFromCart,
    clearCart,
    total
  } = useCart();

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