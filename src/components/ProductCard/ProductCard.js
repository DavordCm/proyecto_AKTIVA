import React from 'react';
import styles from './ProductCard.module.css';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src="/4a4a7353-ebdd-4135-af77-d1d62e944322.jpg"
          alt={product.name}
          className={styles.productImage}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.details}>
          {product.flavor && (
            <span className={styles.badge}>{product.flavor}</span>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.price}>
            S/ {product.price.toFixed(2)}
          </div>
          <button
            className={styles.button}
            onClick={() => onAddToCart(product)}
          >
            Agregar +
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;