import React from 'react';
import styles from './ProductCard.module.css';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.emojiContainer}>
          {product.emoji}
        </div>
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