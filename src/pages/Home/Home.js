import React, { useState, useEffect } from 'react';
import { GiWheat } from 'react-icons/gi';
import { FiZap, FiAward, FiHeart, FiTruck, FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Banner from '../../components/Banner/Banner';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../data/products';
import styles from './Home.module.css';

const featured = products.slice(0, 3);

const CERTS = [
  {
    img: 'hACCP.png',
    alt: 'Certificación HACCP',
    tag: 'Inocuidad Alimentaria',
    title: 'Certificación HACCP',
    subtitle: 'Hazard Analysis and Critical Control Points',
    desc: 'Nuestras instalaciones y procesos de producción cumplen con el estándar internacional HACCP, garantizando que cada barra AKTIVA sea segura desde su elaboración hasta tu mesa.',
    bullets: ['Control de puntos críticos en producción', 'Auditorías periódicas de calidad', 'Trazabilidad completa del producto'],
    year: 'Certificados desde 2025',
    accent: '#5C3D1E',
    bg: 'linear-gradient(135deg, #3D2710 0%, #6B4C2A 100%)',
  },
  {
    img: 'USDA (2).png',
    alt: 'Certificación USDA Organic',
    tag: 'Orgánico Certificado',
    title: 'USDA Organic',
    subtitle: 'United States Department of Agriculture',
    desc: 'Todos los ingredientes de AKTIVA cumplen con los requisitos del Departamento de Agricultura de los Estados Unidos para productos orgánicos — sin pesticidas, sin transgénicos.',
    bullets: ['Ingredientes 100% orgánicos', 'Sin pesticidas ni químicos', 'Avalado por el gobierno de EE.UU.'],
    year: 'Certificados desde 2025',
    accent: '#4A7C3F',
    bg: 'linear-gradient(135deg, #3B6642 0%, #5C8050 100%)',
  },
  {
    img: 'NATURAL.png',
    alt: '100% Natural',
    tag: 'Calidad Premium',
    title: 'Calidad Garantizada',
    subtitle: 'Estándares internacionales de producción',
    desc: 'AKTIVA mantiene rigurosos controles de calidad en cada etapa: desde la selección de materias primas andinas hasta el empaque final, asegurando que recibas lo mejor de los Andes.',
    bullets: ['Selección artesanal de ingredientes', 'Producción bajo normas internacionales', 'Control de calidad en cada lote'],
    year: 'Certificados desde 2025',
    accent: '#8B7355',
    bg: 'linear-gradient(135deg, #5C4A3D 0%, #9C7E5A 100%)',
  },
];

function CertsCarousel() {
  const [current, setCurrent] = useState(0);
  const total = CERTS.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, 8000);
    return () => clearInterval(timer);
  }, [total]);

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  return (
    <div className={styles.slideWrapper}>
      {CERTS.map((c, i) => (
        <div
          key={i}
          className={`${styles.slide} ${i === current ? styles.slideActive : styles.slideHidden}`}
          style={{ background: c.bg }}
        >
          {/* Texto izquierdo */}
          <div className={styles.slideLeft}>
            <span className={styles.slideTag}>{c.tag}</span>
            <h2 className={styles.slideTitle}>{c.title}</h2>
            <p className={styles.slideSubtitle}>{c.subtitle}</p>
            <p className={styles.slideDesc}>{c.desc}</p>
            <ul className={styles.slideBullets}>
              {c.bullets.map((b, j) => (
                <li key={j} className={styles.slideBullet}>
                  <FiAward size={14} className={styles.bulletIcon} /> {b}
                </li>
              ))}
            </ul>
            <span className={styles.slideYear}>{c.year}</span>
          </div>

          {/* Imagen derecha */}
          <div className={styles.slideRight}>
            <div className={styles.slideImgGlow} />
            <img
              src={`${process.env.PUBLIC_URL}/${c.img}`}
              alt={c.alt}
              className={styles.slideImg}
            />
          </div>
        </div>
      ))}

      {/* Flechas */}
      <button className={`${styles.slideBtn} ${styles.slideBtnLeft}`} onClick={prev} aria-label="Anterior">
        <FiChevronLeft size={24} />
      </button>
      <button className={`${styles.slideBtn} ${styles.slideBtnRight}`} onClick={next} aria-label="Siguiente">
        <FiChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className={styles.slideDots}>
        {CERTS.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function Home({ onAddToCart }) {
  return (
    <div className={styles.home}>
      <Banner />

      {/* Banner Summer Fancy Food Show */}
      <section className={styles.fairBanner}>
        <div className={styles.fairBannerInner}>
          <div className={styles.fairBannerText}>
            <span className={styles.fairTag}>¡Próximamente!</span>
            <h2>Nos vemos en Nueva York</h2>
            <p>
              AKTIVA Energy estará presente en la feria internacional de alimentos especializados más importante del mundo.
            </p>
            <div className={styles.fairDetails}>
              <span>📅 28 – 30 de junio 2026</span>
              <a
                href="https://www.google.com/maps/search/Javits+Center+429+11th+Ave+New+York+NY"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.fairMapLink}
              >
                📍 Javits Center, New York, EEUU
              </a>
            </div>
            <img
              src={`${process.env.PUBLIC_URL}/SFFS23_lockup_horz3-3-1024x297-1.png`}
              alt="Summer Fancy Food Show 2026"
              className={styles.fairBannerLogo}
            />
          </div>
          <div className={styles.fairCityBox}>
            <img
              src={`${process.env.PUBLIC_URL}/mek.webp`}
              alt="New York City"
            />
          </div>
        </div>
      </section>

      {/* Certificaciones */}
      <section className={styles.certs}>
        <div className={styles.sectionHeader}>
          <h2>Nuestras Certificaciones</h2>
          <p>Contamos con certificaciones de calidad internacional desde 2025</p>
        </div>
        <CertsCarousel />
      </section>

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
