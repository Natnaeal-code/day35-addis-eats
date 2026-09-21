import PropTypes from "prop-types";

const categories = ["All", "Main", "Vegan", "Breakfast"];

function CategoryBar({ selected, onSelect }) {
  return (
    <div>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          disabled={selected === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

CategoryBar.propTypes = {
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default CategoryBar;