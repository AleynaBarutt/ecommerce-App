import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();

  // toplam fiyat
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Sepetiniz Boş 🛒</h2>
        <Link to="/">Alışverişe Devam Et</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Sepetiniz</h2>

      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.title} width="50" />
          <p style={{ flex: 1 }}>{item.title}</p>
          <p>{item.price} $</p>

          
          <div>
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <span style={{ margin: "0 5px" }}>{item.quantity}</span>
            <button onClick={() => addToCart(item)}>+</button>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}>
            Kaldır
          </button>
        </div>
      ))}

      <h3 style={{ marginTop: "20px" }}>Toplam: {total.toFixed(2)} $</h3>

      <button
        onClick={clearCart}
        style={{
          marginTop: "10px",
          padding: "8px 12px",
          background: "#333",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Sepeti Temizle
      </button>

      <Link to="/" style={{ display: "block", marginTop: "20px" }}>
        ← Alışverişe Devam Et
      </Link>
    </div>
  );
}
