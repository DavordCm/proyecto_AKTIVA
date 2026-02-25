import React, { useState } from 'react';
import { FiBarChart2, FiPackage, FiClipboard, FiDollarSign, FiAlertTriangle, FiTrendingUp, FiCheckCircle, FiClock, FiTruck } from 'react-icons/fi';
import styles from './Employee.module.css';
import { products } from '../../data/products';

function Employee() {
  const [activeTab, setActiveTab] = useState('stats');
  const [inventory, setInventory] = useState(
    products.map(p => ({ ...p, stock: Math.floor(Math.random() * 100) + 10 }))
  );

  const handleStockChange = (productId, newStock) => {
    setInventory(inventory.map(item =>
      item.id === productId ? { ...item, stock: newStock } : item
    ));
  };

  const totalSales = inventory.reduce((sum, item) => sum + (item.price * 5), 0);
  const lowStockItems = inventory.filter(item => item.stock < 20);

  return (
    <div className={styles.employeeContainer}>
      <div className={styles.header}>
        <h1>Panel de Empleado - AKTIVA</h1>
        <p>Gestión de inventario y ventas</p>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === 'stats' ? styles.active : ''}`} onClick={() => setActiveTab('stats')}>
          <FiBarChart2 size={17} /> Estadísticas
        </button>
        <button className={`${styles.tab} ${activeTab === 'inventory' ? styles.active : ''}`} onClick={() => setActiveTab('inventory')}>
          <FiPackage size={17} /> Inventario
        </button>
        <button className={`${styles.tab} ${activeTab === 'orders' ? styles.active : ''}`} onClick={() => setActiveTab('orders')}>
          <FiClipboard size={17} /> Pedidos
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'stats' && (
          <div className={styles.statsSection}>
            <h2>Estadísticas del Mes</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}><FiDollarSign size={28} /></div>
                <h3>Ventas Totales</h3>
                <p className={styles.statValue}>S/ {totalSales.toFixed(2)}</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}><FiPackage size={28} /></div>
                <h3>Productos</h3>
                <p className={styles.statValue}>{products.length}</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}><FiAlertTriangle size={28} /></div>
                <h3>Stock Bajo</h3>
                <p className={styles.statValue}>{lowStockItems.length}</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}><FiTrendingUp size={28} /></div>
                <h3>Crecimiento</h3>
                <p className={styles.statValue}>+12.5%</p>
              </div>
            </div>

            {lowStockItems.length > 0 && (
              <div className={styles.alertBox}>
                <h3><FiAlertTriangle size={18} /> Productos con Stock Bajo</h3>
                <ul>
                  {lowStockItems.map(item => (
                    <li key={item.id}>{item.name} - Stock: {item.stock} unidades</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className={styles.inventorySection}>
            <h2>Gestión de Inventario</h2>
            <div className={styles.inventoryTable}>
              <div className={styles.tableHeader}>
                <div className={styles.col1}>Producto</div>
                <div className={styles.col2}>Precio</div>
                <div className={styles.col3}>Stock Actual</div>
                <div className={styles.col4}>Acciones</div>
              </div>
              {inventory.map(item => (
                <div key={item.id} className={styles.tableRow}>
                  <div className={styles.col1}>{item.name}</div>
                  <div className={styles.col2}>S/ {item.price.toFixed(2)}</div>
                  <div className={styles.col3}>
                    <input
                      type="number"
                      value={item.stock}
                      onChange={(e) => handleStockChange(item.id, parseInt(e.target.value) || 0)}
                      min="0"
                      className={item.stock < 20 ? styles.lowStock : ''}
                    />
                  </div>
                  <div className={styles.col4}>
                    <button className={styles.saveBtn} onClick={() => alert(`Stock actualizado para ${item.name}`)}>
                      Guardar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className={styles.ordersSection}>
            <h2>Pedidos Recientes</h2>
            <div className={styles.ordersList}>
              <div className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <h3>Pedido #001</h3>
                  <span className={`${styles.status} ${styles.delivered}`}><FiCheckCircle size={14} /> Entregado</span>
                </div>
                <p><strong>Cliente:</strong> Juan Pérez</p>
                <p><strong>Productos:</strong> Quinoa & Almendras (x2), Maca & Cacao (x1)</p>
                <p><strong>Total:</strong> S/ 28.00</p>
              </div>
              <div className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <h3>Pedido #002</h3>
                  <span className={`${styles.status} ${styles.pending}`}><FiClock size={14} /> Pendiente</span>
                </div>
                <p><strong>Cliente:</strong> María García</p>
                <p><strong>Productos:</strong> Pack 6 Barras Variadas (x1)</p>
                <p><strong>Total:</strong> S/ 45.00</p>
              </div>
              <div className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <h3>Pedido #003</h3>
                  <span className={`${styles.status} ${styles.shipped}`}><FiTruck size={14} /> Enviado</span>
                </div>
                <p><strong>Cliente:</strong> Carlos López</p>
                <p><strong>Productos:</strong> Kiwicha, Banana & Tarwi (x3)</p>
                <p><strong>Total:</strong> S/ 25.50</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Employee;