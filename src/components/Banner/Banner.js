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
      </div>
    </section>
  );
}

export default Banner;