import PropTypes from "prop-types";
import DishCard from "./DishCard.jsx";

function DishList({ dishes, onAdd }) {
  if (dishes.length === 0) {
    return <p>No dishes in this category yet.</p>;
  }

  return (
    <div>
      {dishes.map((dish) => (
        <DishCard
          key={dish.id}
          dish={dish}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  ).isRequired,

  onAdd: PropTypes.func.isRequired
};

export default DishList;