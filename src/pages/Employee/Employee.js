import { useState } from 'react';
import {
  FiBarChart2, FiPackage, FiClipboard, FiDollarSign,
  FiAlertTriangle, FiTrendingUp, FiCheckCircle, FiClock,
  FiTruck, FiDownload, FiUsers, FiLogOut, FiMail, FiPhone
} from 'react-icons/fi';
import styles from './Employee.module.css';
import { products } from '../../data/products';

const CLIENTS = [
  { id: 1, name: 'Juan Pérez',    email: 'juan@email.com',   phone: '+51 987 654 321', orders: 3, total: 78.50,  status: 'activo' },
  { id: 2, name: 'María García',  email: 'maria@email.com',  phone: '+51 976 543 210', orders: 1, total: 45.00,  status: 'activo' },
  { id: 3, name: 'Carlos López',  email: 'carlos@email.com', phone: '+51 965 432 109', orders: 2, total: 51.00,  status: 'activo' },
  { id: 4, name: 'Ana Rodríguez', email: 'ana@email.com',    phone: '+51 954 321 098', orders: 5, total: 132.75, status: 'activo' },
  { id: 5, name: 'Luis Torres',   email: 'luis@email.com',   phone: '+51 943 210 987', orders: 0, total: 0,      status: 'inactivo' },
];

function Employee() {
  const [activeTab, setActiveTab] = useState('stats');
  const [inventory, setInventory] = useState(
    products.map(p => ({ ...p, stock: Math.floor(Math.random() * 100) + 10 }))
  );
  const [saved, setSaved] = useState({});

  const handleStockChange = (productId, newStock) => {
    setInventory(inventory.map(item =>
      item.id === productId ? { ...item, stock: parseInt(newStock) || 0 } : item
    ));
    setSaved(prev => ({ ...prev, [productId]: false }));
  };

  const handleSave = (productId) => {
    setSaved(prev => ({ ...prev, [productId]: true }));
    setTimeout(() => setSaved(prev => ({ ...prev, [productId]: false })), 2000);
  };

  const exportCSV = () => {
    const header = 'Producto,Precio (USD),Stock,Estado';
    const rows = inventory.map(item =>
      `"${item.name}",${item.price.toFixed(2)},${item.stock},${item.stock < 20 ? 'Stock Bajo' : 'OK'}`
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventario-aktiva.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalSales   = inventory.reduce((sum, item) => sum + (item.price * 5), 0);
  const lowStockItems = inventory.filter(item => item.stock < 20);

  return (
    <div className={styles.container}>

      {/* ── Navbar ── */}
      <header className={styles.navbar}>
        <a href="#/">
          <img src="/a93cb6ff-4b3d-4dbb-88ea-fe8ca6ae5d86.png" alt="AKTIVA" className={styles.navLogo} />
        </a>
        <div className={styles.navRight}>
          <span className={styles.navRole}>Panel Empleado</span>
          <button className={styles.logoutBtn} onClick={() => { window.location.hash = '#/'; }}>
            <FiLogOut size={15} /> Salir
          </button>
        </div>
      </header>

      {/* ── Header ── */}
      <div className={styles.pageHeader}>
        <div>
          <h1>Panel de Empleado</h1>
          <p>Gestión de inventario, pedidos y clientes — AKTIVA Energy</p>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === 'stats'     ? styles.active : ''}`} onClick={() => setActiveTab('stats')}>
          <FiBarChart2 size={16} /> Estadísticas
        </button>
        <button className={`${styles.tab} ${activeTab === 'inventory' ? styles.active : ''}`} onClick={() => setActiveTab('inventory')}>
          <FiPackage size={16} /> Inventario
        </button>
        <button className={`${styles.tab} ${activeTab === 'orders'    ? styles.active : ''}`} onClick={() => setActiveTab('orders')}>
          <FiClipboard size={16} /> Pedidos
        </button>
        <button className={`${styles.tab} ${activeTab === 'clients'   ? styles.active : ''}`} onClick={() => setActiveTab('clients')}>
          <FiUsers size={16} /> Clientes
        </button>
      </div>

      <div className={styles.content}>

        {/* ── Estadísticas ── */}
        {activeTab === 'stats' && (
          <div>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}><FiDollarSign size={26} /></div>
                <p className={styles.statLabel}>Ventas Totales</p>
                <p className={styles.statValue}>$ {totalSales.toFixed(2)}</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}><FiPackage size={26} /></div>
                <p className={styles.statLabel}>Productos</p>
                <p className={styles.statValue}>{products.length}</p>
              </div>
              <div className={`${styles.statCard} ${lowStockItems.length > 0 ? styles.statWarn : ''}`}>
                <div className={styles.statIcon}><FiAlertTriangle size={26} /></div>
                <p className={styles.statLabel}>Stock Bajo</p>
                <p className={styles.statValue}>{lowStockItems.length}</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}><FiTrendingUp size={26} /></div>
                <p className={styles.statLabel}>Crecimiento</p>
                <p className={styles.statValue}>+12.5%</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}><FiUsers size={26} /></div>
                <p className={styles.statLabel}>Clientes</p>
                <p className={styles.statValue}>{CLIENTS.filter(c => c.status === 'activo').length}</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}><FiClipboard size={26} /></div>
                <p className={styles.statLabel}>Pedidos totales</p>
                <p className={styles.statValue}>{CLIENTS.reduce((s, c) => s + c.orders, 0)}</p>
              </div>
            </div>

            {lowStockItems.length > 0 && (
              <div className={styles.alertBox}>
                <h3><FiAlertTriangle size={16} /> Productos con Stock Bajo</h3>
                <ul>
                  {lowStockItems.map(item => (
                    <li key={item.id}>{item.name} — <strong>{item.stock} unidades</strong></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ── Inventario ── */}
        {activeTab === 'inventory' && (
          <div>
            <div className={styles.sectionTop}>
              <h2>Gestión de Inventario</h2>
              <button className={styles.exportBtn} onClick={exportCSV}>
                <FiDownload size={15} /> Exportar CSV
              </button>
            </div>
            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>Producto</span>
                <span>Precio</span>
                <span>Stock</span>
                <span>Estado</span>
                <span>Acción</span>
              </div>
              {inventory.map(item => (
                <div key={item.id} className={styles.tableRow}>
                  <span className={styles.productName}>
                    {item.emoji} {item.name}
                  </span>
                  <span>$ {item.price.toFixed(2)}</span>
                  <span>
                    <input
                      type="number"
                      value={item.stock}
                      min="0"
                      onChange={e => handleStockChange(item.id, e.target.value)}
                      className={`${styles.stockInput} ${item.stock < 20 ? styles.lowStock : ''}`}
                    />
                  </span>
                  <span>
                    <span className={`${styles.stockBadge} ${item.stock < 20 ? styles.badgeLow : styles.badgeOk}`}>
                      {item.stock < 20 ? 'Stock bajo' : 'OK'}
                    </span>
                  </span>
                  <span>
                    <button
                      className={`${styles.saveBtn} ${saved[item.id] ? styles.saveDone : ''}`}
                      onClick={() => handleSave(item.id)}
                    >
                      {saved[item.id] ? <><FiCheckCircle size={13} /> Guardado</> : 'Guardar'}
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Pedidos ── */}
        {activeTab === 'orders' && (
          <div>
            <h2>Pedidos Recientes</h2>
            <div className={styles.ordersList}>
              {[
                { id: '001', client: 'Juan Pérez',    products: 'Quinoa & Almendras (x2), Maca & Cacao (x1)', total: 28.00, status: 'delivered' },
                { id: '002', client: 'María García',  products: 'Pack 6 Barras Variadas (x1)',                 total: 45.00, status: 'pending'   },
                { id: '003', client: 'Carlos López',  products: 'Kiwicha, Banana & Tarwi (x3)',                total: 25.50, status: 'shipped'   },
                { id: '004', client: 'Ana Rodríguez', products: 'Quinoa & Almendras (x4)',                     total: 39.80, status: 'delivered' },
                { id: '005', client: 'Ana Rodríguez', products: 'Maca & Cacao (x2), Teff & Chía (x2)',        total: 32.00, status: 'pending'   },
              ].map(order => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderTop}>
                    <span className={styles.orderId}>Pedido #{order.id}</span>
                    <span className={`${styles.status} ${styles[order.status]}`}>
                      {order.status === 'delivered' && <><FiCheckCircle size={13} /> Entregado</>}
                      {order.status === 'pending'   && <><FiClock size={13} /> Pendiente</>}
                      {order.status === 'shipped'   && <><FiTruck size={13} /> Enviado</>}
                    </span>
                  </div>
                  <p><strong>Cliente:</strong> {order.client}</p>
                  <p><strong>Productos:</strong> {order.products}</p>
                  <p><strong>Total:</strong> $ {order.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Clientes ── */}
        {activeTab === 'clients' && (
          <div>
            <div className={styles.sectionTop}>
              <h2>Clientes Registrados</h2>
              <span className={styles.clientCount}>{CLIENTS.length} clientes en total</span>
            </div>
            <div className={styles.clientsGrid}>
              {CLIENTS.map(client => (
                <div key={client.id} className={styles.clientCard}>
                  <div className={styles.clientAvatar}>
                    {client.name.charAt(0)}
                  </div>
                  <div className={styles.clientInfo}>
                    <div className={styles.clientTop}>
                      <h3>{client.name}</h3>
                      <span className={`${styles.clientStatus} ${client.status === 'activo' ? styles.clientActive : styles.clientInactive}`}>
                        {client.status}
                      </span>
                    </div>
                    <p><FiMail size={13} /> {client.email}</p>
                    <p><FiPhone size={13} /> {client.phone}</p>
                    <div className={styles.clientStats}>
                      <span><strong>{client.orders}</strong> pedidos</span>
                      <span><strong>$ {client.total.toFixed(2)}</strong> total</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Employee;
