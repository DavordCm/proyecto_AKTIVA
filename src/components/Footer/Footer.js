import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3>AKTIVA Energy</h3>
          <p>Barras de energía premium con ingredientes andinos peruanos. Real Nutrition, Energy Without Excuses.</p>
        </div>

        <div className={styles.column}>
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li><a href="#home">Inicio</a></li>
            <li><a href="#products">Productos</a></li>
            <li><a href="#about">Sobre Nosotros</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Contáctanos</h4>
          <p>📍 Lima, Perú</p>
          <p>📧 info@aktivaenergy.pe</p>
          <p>📱 +51 999 999 999</p>
        </div>

        <div className={styles.column}>
          <h4>Síguenos</h4>
          <div className={styles.socialLinks}>
            <a href="#facebook">📘 Facebook</a>
            <a href="#instagram">📷 Instagram</a>
            <a href="#tiktok">🎵 TikTok</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; 2024 AKTIVA Energy - Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;