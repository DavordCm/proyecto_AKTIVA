import React, { useState } from 'react';
import styles from './Contact.module.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Mensaje enviado:', formData);
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
            <div className={styles.infoIcon}>📍</div>
            <h3>Dirección</h3>
            <p>
              Calle Principal 123<br />
              Lima, Perú 15001
            </p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>📱</div>
            <h3>Teléfono</h3>
            <p>
              WhatsApp: +51 952 839 291<br />
              Teléfono: +51 (1) 2345-6789
            </p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>✉️</div>
            <h3>Email</h3>
            <p>
              info@aktivaenergy.pe<br />
              soporte@aktivaenergy.pe
            </p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>🕒</div>
            <h3>Horario</h3>
            <p>
              Lunes - Viernes: 9:00 - 18:00<br />
              Sábado: 10:00 - 14:00
            </p>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>Envíanos tu mensaje</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Asunto</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Asunto de tu mensaje"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Cuéntanos tu mensaje..."
                rows="6"
                required
              ></textarea>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Enviar Mensaje
            </button>
          </form>
        </div>

        <div className={styles.socialSection}>
          <h2>Síguenos en redes</h2>
          <div className={styles.socialLinks}>
            <a href="javascript:void(0)" className={styles.socialLink}>📘 Facebook</a>
            <a href="javascript:void(0)" className={styles.socialLink}>📷 Instagram</a>
            <a href="javascript:void(0)" className={styles.socialLink}>🎵 TikTok</a>
            <a href="javascript:void(0)" className={styles.socialLink}>💼 LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
