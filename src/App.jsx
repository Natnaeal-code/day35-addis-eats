import { lazy, Suspense, useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import Layout from "./ui/Layout.jsx";
import Menu from "./menu/Menu.jsx";
import Cart from "./cart/Cart.jsx";
import { useCartStore } from "./cart/cartStore.js";

const DishDetail = lazy(() => import("./menu/DishDetail.jsx"));

function Home() {
  return (
    <div>
      <h1>Welcome to Addis Eats</h1>
      <p>Fresh Ethiopian food delivered to you.</p>
    </div>
  );
}

function CheckoutPage() {
  const items = useCartStore((state) => state.items);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (
      !/^(?:\+251|0)9\d{8}$/.test(formData.phone)
    ) {
      newErrors.phone =
        "Enter a valid Ethiopian phone number.";
    }

    if (!formData.area.trim()) {
      newErrors.area = "Delivery area is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div>
        <h1>Order Confirmed!</h1>

        <p>Thank you, {formData.name}.</p>

        <p>
          Your order will be delivered to {formData.area}.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Checkout</h1>
      <p>Complete your order.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />

          {errors.name && <p>{errors.name}</p>}
        </div>

        <br />

        <div>
          <label htmlFor="phone">Phone</label>

          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />

          {errors.phone && <p>{errors.phone}</p>}
        </div>

        <br />

        <div>
          <label htmlFor="area">Delivery Area</label>

          <input
            id="area"
            name="area"
            type="text"
            value={formData.area}
            onChange={handleChange}
          />

          {errors.area && <p>{errors.area}</p>}
        </div>

        <br />

        <button type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <p>Page not found.</p>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="menu" element={<Menu />} />

        <Route
          path="menu/:id"
          element={
            <Suspense fallback={<p>Loading dish page...</p>}>
              <DishDetail />
            </Suspense>
          }
        />

        <Route path="cart" element={<Cart />} />

        <Route
          path="checkout"
          element={<CheckoutPage />}
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;