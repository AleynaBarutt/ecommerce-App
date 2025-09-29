
import React from 'react';
import PropTypes from 'prop-types';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart }) {
  // Eğer description çok uzunsa kısaltalım
  const shortDesc =
    product.description && product.description.length > 100
      ? product.description.slice(0, 100) + '...'
      : product.description;

  return (
    <article className="product-card" aria-label={product.title}>
      <img
        className="product-card__image"
        src={product.image}
        alt={product.title}
        loading="lazy"
      />
      <div className="product-card__body">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__price">
          {new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'USD',
          }).format(product.price)}
        </p>
        <p className="product-card__desc">{shortDesc}</p>
        <div className="product-card__actions">
          <button
            className="btn"
            onClick={() => onAddToCart(product)}
            aria-label={`Sepete ekle ${product.title}`}
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
