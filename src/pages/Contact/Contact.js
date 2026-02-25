import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiFacebook, FiInstagram } from 'react-icons/fi';
import { FaTiktok, FaLinkedinIn } from 'react-icons/fa';
import styles from './Contact.module.css';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.banner}>
        <h1>Contacto</h1>
        <p>¿Tienes preguntas? Estamos aquí para ayudarte</p>
      </div>

      <div className={styles.content}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}><FiMapPin size={28} /></div>
            <h3>Dirección</h3>
            <p>Av. Alfredo Benavides 768<br />Miraflores, Lima 18, Perú</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}><FiPhone size={28} /></div>
            <h3>Teléfono</h3>
            <p>WhatsApp: +51 952 839 291<br />Teléfono: +51 (1) 2345-6789</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}><FiMail size={28} /></div>
            <h3>Email</h3>
            <p>info@aktivaenergy.pe<br />soporte@aktivaenergy.pe</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}><FiClock size={28} /></div>
            <h3>Horario</h3>
            <p>Lunes - Viernes: 9:00 - 18:00<br />Sábado: 10:00 - 14:00</p>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>Envíanos tu mensaje</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Tu nombre completo" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="tu@email.com" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="subject">Asunto</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Asunto de tu mensaje" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Mensaje</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Cuéntanos tu mensaje..." rows="6" required></textarea>
            </div>
            <button type="submit" className={styles.submitBtn}>Enviar Mensaje</button>
          </form>
        </div>

        <div className={styles.socialSection}>
          <h2>Síguenos en redes</h2>
          <div className={styles.socialLinks}>
            <a href="#facebook" className={styles.socialLink}><FiFacebook size={22} /> Facebook</a>
            <a href="#instagram" className={styles.socialLink}><FiInstagram size={22} /> Instagram</a>
            <a href="#tiktok" className={styles.socialLink}><FaTiktok size={20} /> TikTok</a>
            <a href="#linkedin" className={styles.socialLink}><FaLinkedinIn size={20} /> LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;