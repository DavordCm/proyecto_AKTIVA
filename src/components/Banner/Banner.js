import React from 'react';
import { GiWheat } from 'react-icons/gi';
import { FiZap, FiTruck, FiAward } from 'react-icons/fi';
import styles from './Banner.module.css';

function Banner() {
  const scrollToProducts = () => {
    window.location.hash = '#/productos';
  };

  return (
    <section className={styles.banner}>
      <div className={styles.bgImage} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/granola.jpg)` }}></div>
      <div className={styles.overlay}></div>

      <div className={styles.layout}>

        <div className={styles.left}>
          <span className={styles.tag}><GiWheat size={14} /> Superalimentos Andinos</span>
          <h1 className={styles.title}>
            <span className={styles.titleLine1}>AKTIVA</span>
            <span className={styles.titleLine2}>Energy Bars</span>
          </h1>
          <p className={styles.description}>Real Nutrition, Energy Without Excuses</p>
          <p className={styles.tagline}>Sin azúcar añadido · 100% Natural · Hecho en Perú</p>

          <div className={styles.buttons}>
            <button className={styles.ctaPrimary} onClick={scrollToProducts}>Descubre Nuestras Barras</button>
            <a href="#/nosotros" className={styles.ctaSecondary}>Nuestra Historia</a>
          </div>

        </div>

        <div className={styles.right}>
          <div className={`${styles.card} ${styles.card1}`}>
            <GiWheat size={32} className={styles.cardIcon} />
            <div>
              <h4>Ingredientes Andinos</h4>
              <p>Kiwicha, quinoa, maca y más superalimentos peruanos</p>
            </div>
          </div>

          <div className={`${styles.card} ${styles.card2}`}>
            <FiZap size={32} className={styles.cardIcon} />
            <div>
              <h4>Energía Natural</h4>
              <p>Sin azúcar refinado, energía sostenida todo el día</p>
            </div>
          </div>

          <div className={`${styles.card} ${styles.card3}`}>
            <FiTruck size={32} className={styles.cardIcon} />
            <div>
              <h4>Envío Rápido</h4>
              <p>Delivery gratis en Lima Metropolitana</p>
            </div>
          </div>

          <div className={`${styles.card} ${styles.card4}`}>
            <FiAward size={32} className={styles.cardIcon} />
            <div>
              <h4>Alto en Proteína</h4>
              <p>Ideal para deportistas y vida activa</p>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}

export default Banner;