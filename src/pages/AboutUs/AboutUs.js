import React from 'react';
import styles from './AboutUs.module.css';

function AboutUs() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.banner}>
        <h1>Sobre AKTIVA Energy</h1>
        <p>Energía Natural, Sostenibilidad Andina</p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Nuestra Misión</h2>
          <p>
            Proporcionar barras de energía nutritivas y sostenibles que celebran la riqueza
            de los ingredientes andinos peruanos, permitiendo que cada persona tenga acceso a
            energía natural y de calidad para sus actividades diarias.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Nuestra Visión</h2>
          <p>
            Ser la marca líder en barras energéticas naturales en Latinoamérica, reconocida
            por la calidad de nuestros productos y nuestro compromiso con el desarrollo sostenible
            de comunidades andinas.
          </p>
        </section>

        <section className={styles.section}>
          <h2>¿Por qué AKTIVA?</h2>
          <ul className={styles.features}>
            <li>
              <span className={styles.icon}>🌾</span>
              <strong>Ingredientes 100% Naturales</strong>
              <p>Utilizamos solo ingredientes andinos auténticos y de alta calidad</p>
            </li>
            <li>
              <span className={styles.icon}>⚡</span>
              <strong>Energía Sostenida</strong>
              <p>Sin azúcar refinado, proporciona energía duradera y estable</p>
            </li>
            <li>
              <span className={styles.icon}>🌍</span>
              <strong>Sostenibilidad</strong>
              <p>Apoyamos a productores locales y prácticas agrícolas responsables</p>
            </li>
            <li>
              <span className={styles.icon}>❤️</span>
              <strong>Salud Integral</strong>
              <p>Ricas en vitaminas, minerales y proteína natural</p>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Nuestros Valores</h2>
          <div className={styles.values}>
            <div className={styles.valueCard}>
              <h3>🎯 Calidad</h3>
              <p>Cada barra es cuidadosamente elaborada con los mejores ingredientes</p>
            </div>
            <div className={styles.valueCard}>
              <h3>🤝 Comunidad</h3>
              <p>Trabajamos directamente con productores andinos para asegurar prácticas justas</p>
            </div>
            <div className={styles.valueCard}>
              <h3>🌱 Sostenibilidad</h3>
              <p>Nuestro compromiso es con el planeta y las generaciones futuras</p>
            </div>
            <div className={styles.valueCard}>
              <h3>💪 Salud</h3>
              <p>Promovemos un estilo de vida activo y saludable con nutrición natural</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Nuestro Equipo</h2>
          <p>
            AKTIVA fue fundada por un equipo apasionado de nutricionistas, emprendedores y amantes
            de la nutrición natural. Trabajamos con dedicación para llevar los beneficios de los
            superalimentos andinos a cada rincón del país.
          </p>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
