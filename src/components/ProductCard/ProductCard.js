import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import styles from './ProductCard.module.css';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {product.image ? (
          <img src={product.image} alt={product.name} className={styles.productImg} />
        ) : (
          <div className={styles.emojiContainer}>
            {product.emoji}
          </div>
        )}
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
            $ {product.price.toFixed(2)}
            <span className={styles.priceAlt}>≈ S/ {(product.price * 3.31).toFixed(2)}</span>
          </div>
          <button
            className={styles.button}
            onClick={() => { window.location.hash = '#/iniciar-sesion'; }}
          >
            <FiShoppingCart size={15} /> Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;