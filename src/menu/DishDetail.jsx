import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDishById } from "../api/dishes.js";

function DishDetail() {
  const { id } = useParams();

  const [dish, setDish] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    async function loadDish() {
      setStatus("loading");

      const data = await getDishById(id);

      if (!cancelled) {
        if (data) {
          setDish(data);
          setStatus("success");
        } else {
          setStatus("not-found");
        }
      }
    }

    loadDish();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "loading") {
    return <p>Loading dish...</p>;
  }

  if (status === "not-found") {
    return (
      <div>
        <h1>Dish not found</h1>
        <Link to="/menu">Back to menu</Link>
      </div>
    );
  }

  return (
    <article>
      <h1>{dish.name}</h1>

      <p>{dish.description}</p>

      <p>
        <strong>{dish.price} ETB</strong>
      </p>

      <p>Category: {dish.category}</p>

      {dish.spicy && <p>🌶️ Spicy</p>}

      <Link to="/menu">← Back to menu</Link>
    </article>
  );
}

export default DishDetail;