import React from 'react';
import styles from './RoleSelector.module.css';

function RoleSelector() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Selecciona tu rol</h1>
        <p>¿Cómo deseas acceder a AKTIVA?</p>

        <div className={styles.rolesGrid}>
          <div className={styles.roleCard}>
            <div className={styles.roleIcon}>👨‍💼</div>
            <h2>Empleado</h2>
            <p>Gestiona inventario, visualiza estadísticas y administra pedidos</p>
            <ul className={styles.features}>
              <li>📊 Panel de estadísticas</li>
              <li>📦 Gestión de inventario</li>
              <li>📋 Visualizar pedidos</li>
              <li>⚠️ Alertas de stock bajo</li>
            </ul>
            <a href="#/empleado" className={styles.btn}>
              Acceder como Empleado
            </a>
          </div>

          <div className={styles.roleCard}>
            <div className={styles.roleIcon}>🛍️</div>
            <h2>Cliente</h2>
            <p>Explora, compara y compra nuestras barras de energía premium</p>
            <ul className={styles.features}>
              <li>🛒 Carrito de compras</li>
              <li>🔍 Búsqueda de productos</li>
              <li>💰 Proceso de pago seguro</li>
              <li>📦 Seguimiento de pedidos</li>
            </ul>
            <a href="#/cliente" className={styles.btn}>
              Acceder como Cliente
            </a>
          </div>
        </div>

        <p className={styles.footer}>
          <a href="#/">Volver a Inicio</a>
        </p>
      </div>
    </div>
  );
}

export default RoleSelector;
