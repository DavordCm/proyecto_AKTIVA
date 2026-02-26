import { FiCalendar, FiMapPin, FiX, FiStar } from 'react-icons/fi';
import { useState } from 'react';
import styles from './AnnouncementBar.module.css';

function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <span className={styles.badge}>
          <FiStar size={10} className={styles.badgeIcon} /> ¡NOTICIAS!
        </span>
        <img
          src={`${process.env.PUBLIC_URL}/SFFS23_lockup_horz3-3-1024x297-1.png`}
          alt="Summer Fancy Food Show"
          className={styles.fairLogo}
        />
        <span className={styles.text}>
          AKTIVA Energy participará en la&nbsp;
          <strong>Summer Fancy Food Show 2026</strong>
          &nbsp;—&nbsp;
          <FiCalendar size={13} className={styles.iconInline} />
          28 al 30 de junio
          &nbsp;·&nbsp;
          <FiMapPin size={13} className={styles.iconInline} />
          New York, EEUU
        </span>
        <span className={styles.cta}>¡Ven a conocernos!</span>
      </div>
      <button className={styles.close} onClick={() => setVisible(false)} aria-label="Cerrar">
        <FiX size={16} />
      </button>
    </div>
  );
}

export default AnnouncementBar;
