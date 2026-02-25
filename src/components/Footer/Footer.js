import React from 'react';
import { FiMapPin, FiMail, FiPhone, FiFacebook, FiInstagram } from 'react-icons/fi';
import { FaTiktok, FaLinkedinIn } from 'react-icons/fa';
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
            <li><a href="#/">Inicio</a></li>
            <li><a href="#/">Productos</a></li>
            <li><a href="#/about">Sobre Nosotros</a></li>
            <li><a href="#/contact">Contacto</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Contáctanos</h4>
          <p><FiMapPin size={14} style={{ marginRight: '0.4rem' }} />Av. Alfredo Benavides 768, Miraflores, Lima 18</p>
          <p><FiMail size={14} style={{ marginRight: '0.4rem' }} />info@aktivaenergy.pe</p>
          <p><FiPhone size={14} style={{ marginRight: '0.4rem' }} />+51 999 999 999</p>
        </div>

        <div className={styles.column}>
          <h4>Síguenos</h4>
          <div className={styles.socialLinks}>
            <a href="#facebook" className={styles.socialIcon}><FiFacebook size={20} /></a>
            <a href="#instagram" className={styles.socialIcon}><FiInstagram size={20} /></a>
            <a href="#tiktok" className={styles.socialIcon}><FaTiktok size={18} /></a>
            <a href="#linkedin" className={styles.socialIcon}><FaLinkedinIn size={18} /></a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; 2025 AKTIVA Energy - Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;