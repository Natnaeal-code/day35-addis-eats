const dishes = [
  {
    id: "tibs",
    name: "Beef Tibs",
    price: 400,
    category: "Main",
    spicy: true,
    description: "Tender beef sautéed with onions, peppers, and Ethiopian spices."
  },
  {
    id: "shiro",
    name: "Shiro",
    price: 250,
    category: "Vegan",
    spicy: false,
    description: "Smooth chickpea stew seasoned with Ethiopian spices."
  },
  {
    id: "doro-wot",
    name: "Doro Wot",
    price: 350,
    category: "Main",
    spicy: true,
    description: "Traditional Ethiopian chicken stew with berbere and boiled egg."
  },
  {
    id: "chechebsa",
    name: "Chechebsa",
    price: 220,
    category: "Breakfast",
    spicy: false,
    description: "Shredded flatbread mixed with spiced butter and honey."
  },
  {
    id: "kitfo",
    name: "Kitfo",
    price: 450,
    category: "Main",
    spicy: true,
    description: "Seasoned minced beef served with traditional Ethiopian sides."
  }
];

export function getDishes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dishes);
    }, 500);
  });
}

export function getDishById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dishes.find((dish) => dish.id === id));
    }, 300);
  });
}