import React from 'react';
import styles from './Banner.module.css';

function Banner() {
  return (
    <section className={styles.banner}>
      <div className={styles.bgImage} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/granola.jpg)` }}></div>
      <div className={styles.overlay}></div>

      <div className={styles.floatingCircle1}></div>
      <div className={styles.floatingCircle2}></div>
      <div className={styles.floatingCircle3}></div>

      <div className={styles.content}>
        <span className={styles.tag}>🌾 Superalimentos Andinos</span>
        <h1 className={styles.title}>
          <span className={styles.titleLine1}>AKTIVA</span>
          <span className={styles.titleLine2}>Energy Bars</span>
        </h1>
        <p className={styles.description}>
          Real Nutrition, Energy Without Excuses
        </p>
        <p className={styles.tagline}>
          Ingredientes andinos peruanos · Sin azúcar añadido · 100% Natural
        </p>

        <div className={styles.buttons}>
          <button className={styles.ctaPrimary}>Descubre Nuestras Barras</button>
          <a href="#/about" className={styles.ctaSecondary}>Conoce Nuestra Historia</a>
        </div>

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

      <div className={styles.scrollIndicator}>
        <span></span>
      </div>
    </section>
  );
}

export default Banner;