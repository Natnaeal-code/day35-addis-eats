import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function DishCard({ dish, onAdd }) {
  return (
    <article>
      <h3>{dish.name}</h3>

      <p>{dish.description}</p>

      <p>
        <strong>{dish.price} ETB</strong>
      </p>

      <p>Category: {dish.category}</p>

      {dish.spicy && <span>🌶️ Spicy</span>}

      <div>
        <Link to={`/menu/${dish.id}`}>View details</Link>

        <button onClick={() => onAdd(dish)}>
          Add to cart
        </button>
      </div>
    </article>
  );
}

DishCard.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    spicy: PropTypes.bool,
    description: PropTypes.string.isRequired
  }).isRequired,

  onAdd: PropTypes.func.isRequired
};

export default DishCard;