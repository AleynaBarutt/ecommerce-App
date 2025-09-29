import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";
import { useCart } from "../context/CartContext";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { addToCart } = useCart();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);

        // kategorileri çek
        const cats = Array.from(new Set(data.map((p) => p.category)));
        setCategories(cats);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
    return () => controller.abort();
  }, []);

  // filtreleme fonksiyonu
  useEffect(() => {
    let temp = products;

    if (selectedCategory !== "all") {
      temp = temp.filter((p) => p.category === selectedCategory);
    }

    if (search.trim() !== "") {
      temp = temp.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(temp);
  }, [search, selectedCategory, products]);

  if (loading) return <div className="center">Yükleniyor...</div>;
  if (error) return <div className="center error">Hata: {error}</div>;

  return (
    <div>
      {/* Arama ve kategori filtreleme */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Ürün ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="all">Tüm Kategoriler</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <section className="product-list">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
        ))}
      </section>
    </div>
  );
}
