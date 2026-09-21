import { useEffect, useState } from "react";
import CategoryBar from "./CategoryBar.jsx";
import DishList from "./DishList.jsx";
import { getDishes } from "../api/dishes.js";
import { useCart } from "../cart/CartContext.jsx";

function Menu() {
  const { addToCart } = useCart();

  const [dishes, setDishes] = useState([]);
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadDishes() {
      try {
        setStatus("loading");
        setError(null);

        const data = await getDishes();

        if (!cancelled) {
          setDishes(data);
          setStatus("success");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setStatus("error");
        }
      }
    }

    loadDishes();

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return <p>Loading menu...</p>;
  }

  if (status === "error") {
    return <p>Failed to load menu: {error}</p>;
  }

  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  return (
    <section>
      <h1>Our Menu</h1>

      <CategoryBar
        selected={category}
        onSelect={setCategory}
      />

     <DishList
  dishes={filteredDishes}
  onAdd={addToCart}
/>
    </section>
  );
}

export default Menu;