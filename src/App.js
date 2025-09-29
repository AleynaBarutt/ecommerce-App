import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./pages/Cart";
import { CartProvider, useCart } from "./context/CartContext";
import "./components/Navbar.css";

// Navbar component
function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
  
      <Link to="/">
        Ana Sayfa
      </Link>
      <Link to="/cart" className="cart">
        🛒 Sepet ({totalItems})
      </Link>
    </nav>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
