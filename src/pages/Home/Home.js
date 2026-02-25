import React from 'react';
import { GiWheat } from 'react-icons/gi';
import { FiZap, FiTruck } from 'react-icons/fi';
import Banner from '../../components/Banner/Banner';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import { products } from '../../data/products';
import styles from './Home.module.css';

function Home({ onAddToCart }) {
  return (
    <div className={styles.home}>
      <Banner />
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.featureCard}>
            <div className={styles.icon}><GiWheat size={40} /></div>
            <h3>Ingredientes Andinos</h3>
            <p>Kiwicha, quinoa, teff y más superalimentos peruanos</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.icon}><FiZap size={40} /></div>
            <h3>Energía Natural</h3>
            <p>Sin azúcar añadido, energía sostenida</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.icon}><FiTruck size={40} /></div>
            <h3>Envío Rápido</h3>
            <p>Envíos gratis a Lima Metropolitana</p>
          </div>
        </div>
      </section>
      <ProductGrid id="products-section" products={products} onAddToCart={onAddToCart} />
    </div>
  );
}

export default Home;