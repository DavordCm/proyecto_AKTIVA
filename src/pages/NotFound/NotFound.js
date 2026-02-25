import { FiAlertTriangle, FiHome, FiShoppingBag } from 'react-icons/fi';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}><FiAlertTriangle size={56} /></div>
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>La página que buscas no existe o fue movida.</p>
        <div className={styles.buttons}>
          <a href="#/" className={styles.btnPrimary}>
            <FiHome size={18} /> Ir al inicio
          </a>
          <a href="#/productos" className={styles.btnSecondary}>
            <FiShoppingBag size={18} /> Ver productos
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
