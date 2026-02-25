import React from 'react';
import { GiWheat } from 'react-icons/gi';
import { FiZap, FiAward, FiHeart, FiTruck, FiArrowRight } from 'react-icons/fi';
import Banner from '../../components/Banner/Banner';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../data/products';
import styles from './Home.module.css';

const featured = products.slice(0, 3);

function Home({ onAddToCart }) {
  return (
    <div className={styles.home}>
      <Banner />

      {/* Productos Destacados */}
      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <h2>Nuestras Barras Más Populares</h2>
          <p>Superalimentos andinos en cada bocado</p>
        </div>
        <div className={styles.featuredGrid}>
          {featured.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
        <div className={styles.featuredFooter}>
          <a href="#/productos" className={styles.verTodos}>
            Ver todos los productos <FiArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Por qué AKTIVA */}
      <section className={styles.why}>
        <div className={styles.sectionHeader}>
          <h2>¿Por qué elegir AKTIVA?</h2>
          <p>Nutrición real, sin compromisos</p>
        </div>
        <div className={styles.whyGrid}>
          <div className={styles.whyCard}>
            <div className={styles.whyIcon}><GiWheat size={36} /></div>
            <h3>100% Natural</h3>
            <p>Solo ingredientes andinos auténticos, sin aditivos ni conservantes artificiales</p>
          </div>
          <div className={styles.whyCard}>
            <div className={styles.whyIcon}><FiZap size={36} /></div>
            <h3>Sin Azúcar Añadido</h3>
            <p>Energía sostenida durante todo el día sin los picos de azúcar refinado</p>
          </div>
          <div className={styles.whyCard}>
            <div className={styles.whyIcon}><FiAward size={36} /></div>
            <h3>Certificado HACCP</h3>
            <p>Producción con estándares internacionales de inocuidad alimentaria</p>
          </div>
          <div className={styles.whyCard}>
            <div className={styles.whyIcon}><FiHeart size={36} /></div>
            <h3>Alto en Proteína</h3>
            <p>Ideal para deportistas, estudiantes y personas con estilo de vida activo</p>
          </div>
        </div>
      </section>

      {/* Franja de ingredientes */}
      <section className={styles.ingredients}>
        <div className={styles.ingredientsInner}>
          <span className={styles.ingredientTag}><GiWheat size={16} /> Kiwicha</span>
          <span className={styles.divider}>·</span>
          <span className={styles.ingredientTag}><GiWheat size={16} /> Quinoa</span>
          <span className={styles.divider}>·</span>
          <span className={styles.ingredientTag}><GiWheat size={16} /> Maca</span>
          <span className={styles.divider}>·</span>
          <span className={styles.ingredientTag}><GiWheat size={16} /> Teff</span>
          <span className={styles.divider}>·</span>
          <span className={styles.ingredientTag}><FiHeart size={14} /> Chía</span>
          <span className={styles.divider}>·</span>
          <span className={styles.ingredientTag}><FiTruck size={14} /> Envío Lima Gratis</span>
        </div>
      </section>
    </div>
  );
}

export default Home;
