import React from "react";
import PropTypes from "prop-types";
import "./ProductCard.css";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
  // description uzun ise kısalt
  const shortDesc =
    product.description && product.description.length > 100
      ? product.description.slice(0, 100) + "..."
      : product.description;

  return (
    <article className="product-card" aria-label={product.title}>
      <Link to={`/product/${product.id}`}>
        <img
          className="product-card__image"
          src={product.image}
          alt={product.title}
          loading="lazy"
        />
      </Link>
      <div className="product-card__body">
        <h3 className="product-card__title">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>
        <p className="product-card__price">
          {new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "USD",
          }).format(product.price)}
        </p>
        <p className="product-card__desc">{shortDesc}</p>
        <div className="product-card__actions">
          <button
            className="btn"
            onClick={() => onAddToCart(product)}
            aria-label={`Sepete ekle ${product.title}`}
            style={{
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#28a745",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func,
};

ProductCard.defaultProps = {
  onAddToCart: () => {},
};
