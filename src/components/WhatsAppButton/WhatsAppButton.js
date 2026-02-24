import React from 'react';
import styles from './WhatsAppButton.module.css';

function WhatsAppButton() {
  const phoneNumber = '51952839291';
  const message = 'Hola! Me interesa conocer más sobre las barras AKTIVA Energy.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappButton}
      title="Contáctanos por WhatsApp"
    >
      <img
        src="/ciculaar.webp"
        alt="WhatsApp"
        className={styles.whatsappImage}
      />
    </a>
  );
}

export default WhatsAppButton;