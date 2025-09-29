import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetail.css";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart(); // hook ile alıyoruz
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="center">Yükleniyor...</div>;
  if (error) return <div className="center error">Hata: {error}</div>;
  if (!product) return null;

  return (
    <div className="product-detail">
      <Link to="/">← Geri</Link>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} className="product-detail__image" />
      <p>{product.description}</p>
      <p className="product-detail__price">
        {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "USD" }).format(product.price)}
      </p>
      <button onClick={() => addToCart(product)}>Sepete Ekle</button>
    </div>
  );
}
