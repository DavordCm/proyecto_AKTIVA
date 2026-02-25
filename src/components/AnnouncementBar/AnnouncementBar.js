import { FiCalendar, FiMapPin, FiX } from 'react-icons/fi';
import { useState } from 'react';
import styles from './AnnouncementBar.module.css';

function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <span className={styles.badge}>¡NOVEDAD!</span>
        <span className={styles.text}>
          <FiCalendar size={14} className={styles.iconInline} />
          ¡Asistiremos a la <strong>Fancy Food Show</strong>!
          <FiMapPin size={14} className={styles.iconInline} />
          Lima, Perú &nbsp;·&nbsp; 28 al 30 de junio 2026
        </span>
      </div>
      <button className={styles.close} onClick={() => setVisible(false)} aria-label="Cerrar">
        <FiX size={16} />
      </button>
    </div>
  );
}

export default AnnouncementBar;
