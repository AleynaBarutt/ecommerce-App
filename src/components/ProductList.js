
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);   // ürün verisi useState([]) — ürünleri dizi olarak saklar.
  const [loading, setLoading] = useState(true);   // yükleniyor
  const [error, setError] = useState(null);       // hata mesajı

  //useEffect(..., []) — bileşen mount olduğunda API çağrısı yapılır; dependency array boş olduğu için sadece bir kere çalışır.
  useEffect(() => {
    const controller = new AbortController(); // fetch iptali için token
    async function fetchProducts() {
      try {
        setLoading(true); // yükleniyor durumunu aç
        const res = await fetch('https://fakestoreapi.com/products', {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();

    // cleanup: component unmount olursa fetch'i iptal et
    return () => controller.abort();
  }, []); // boş array: sadece mount/unmount

  function handleAddToCart(product) {
    // Şimdilik sadece konsola yazdırıyoruz; ileride context/redux veya localStorage kullanacağız
    console.log('Sepete ekleniyor:', product.id, product.title);
  }

  if (loading) return <div className="center">Yükleniyor...</div>;
  if (error) return <div className="center error">Hata: {error}</div>;

  return (
    <section className="product-list">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
      ))}
    </section>
  );
}
