import React from 'react';
import styles from './Banner.module.css';

function Banner() {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <h1 className={styles.title}>AKTIVA</h1>
        <p className={styles.subtitle}>Energy Bars Premium</p>
        <p className={styles.description}>
          Real Nutrition, Energy Without Excuses
        </p>
        <p className={styles.tagline}>Ingredientes andinos peruanos con energía natural y sin azúcar añadido</p>
        <button className={styles.cta}>Descubre Nuestras Barras</button>
        <div className={styles.certifications}>
          <div className={styles.certBadge}>
            <span className={styles.certIcon}>✅</span>
            <span className={styles.certText}>HACCP</span>
            <span className={styles.certSub}>Certified</span>
          </div>
          <div className={styles.certBadge}>
            <span className={styles.certIcon}>🌿</span>
            <span className={styles.certText}>USDA</span>
            <span className={styles.certSub}>Organic</span>
          </div>
          <div className={styles.certBadge}>
            <span className={styles.certIcon}>🏆</span>
            <span className={styles.certText}>100%</span>
            <span className={styles.certSub}>Natural</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;