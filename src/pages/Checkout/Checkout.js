import React, { useState } from 'react';
import { FiCreditCard, FiChevronLeft, FiCheckCircle, FiLock, FiShoppingBag } from 'react-icons/fi';
import styles from './Checkout.module.css';

const MONTHS = ['01','02','03','04','05','06','07','08','09','10','11','12'];
const YEARS  = Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() + i));

function Checkout({ cartItems = [], onClearCart }) {
  const [method, setMethod] = useState('');
  const [done, setDone]     = useState(false);
  const [card, setCard]     = useState({ number: '', name: '', month: '', year: '', cvv: '' });
  const [yapePhone, setYapePhone]   = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');

  // Leer carrito desde localStorage si el prop viene vacío (viene del Client)
  const savedCart = (() => {
    try { return JSON.parse(localStorage.getItem('aktiva-checkout-cart') || '[]'); } catch { return []; }
  })();
  const items = cartItems.length > 0 ? cartItems : savedCart;

  const total    = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotal = total;
  const shipping = 0;

  const handlePay = (e) => {
    e.preventDefault();
    setDone(true);
    localStorage.removeItem('aktiva-checkout-cart');
    if (onClearCart) onClearCart();
  };

  if (done) {
    return (
      <div className={styles.container}>
        <div className={styles.successBox}>
          <div className={styles.successIconWrap}>
            <FiCheckCircle size={56} />
          </div>
          <h2>¡Pago exitoso!</h2>
          <p>Tu pedido ha sido confirmado. Te enviaremos los detalles a tu correo pronto.</p>
          <a href="#/" className={styles.backHome}>Volver al inicio</a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>

        {/* ── Columna izquierda: resumen ── */}
        <div className={styles.summary}>
          <button className={styles.back} onClick={() => window.history.back()}>
            <FiChevronLeft size={16} /> Volver
          </button>

          <div className={styles.summaryHeader}>
            <FiShoppingBag size={20} />
            <h2>Resumen de compra</h2>
          </div>

          <div className={styles.itemsList}>
            {items.length === 0 ? (
              <p className={styles.emptyMsg}>No hay productos en el carrito.</p>
            ) : items.map(item => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemEmoji}>{item.emoji || '🍫'}</div>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemQty}>x{item.quantity}</span>
                </div>
                <span className={styles.itemPrice}>$ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>$ {subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Envío</span>
              <span className={styles.freeShip}>Gratis</span>
            </div>
            <div className={`${styles.totalRow} ${styles.grandTotal}`}>
              <span>Total</span>
              <span>$ {(subtotal + shipping).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* ── Columna derecha: pago ── */}
        <div className={styles.payment}>
          <h1 className={styles.title}>Método de Pago</h1>
          <p className={styles.sub}>Elige cómo quieres pagar</p>

          <div className={styles.methods}>
            {[
              { id: 'yape',   label: 'Yape',    icon: '💜', desc: 'Transferencia instantánea' },
              { id: 'paypal', label: 'PayPal',  icon: '🅿️', desc: 'Pago internacional seguro' },
              { id: 'card',   label: 'Tarjeta', icon: '💳', desc: 'Visa · Mastercard · Amex'  },
            ].map(m => (
              <button
                key={m.id}
                type="button"
                className={`${styles.methodBtn} ${method === m.id ? styles.methodActive : ''}`}
                onClick={() => setMethod(m.id)}
              >
                <span className={styles.methodIcon}>{m.icon}</span>
                <div className={styles.methodInfo}>
                  <strong>{m.label}</strong>
                  <small>{m.desc}</small>
                </div>
                <span className={`${styles.methodDot} ${method === m.id ? styles.methodDotOn : ''}`} />
              </button>
            ))}
          </div>

          {/* ── Yape ── */}
          {method === 'yape' && (
            <form onSubmit={handlePay} className={styles.form}>
              <div className={styles.yapeCard}>
                <div className={styles.yapeLogo}>💜</div>
                <p className={styles.yapeLabel}>Yapea al número</p>
                <p className={styles.yapeNum}>+51 952 839 291</p>
              </div>
              <label className={styles.label}>Tu número de celular</label>
              <input
                className={styles.input}
                type="tel"
                placeholder="987 654 321"
                value={yapePhone}
                onChange={e => setYapePhone(e.target.value)}
                required
              />
              <button type="submit" className={styles.payBtn}>
                <FiLock size={15} /> Confirmar pago — $ {total.toFixed(2)}
              </button>
            </form>
          )}

          {/* ── PayPal ── */}
          {method === 'paypal' && (
            <form onSubmit={handlePay} className={styles.form}>
              <div className={styles.paypalCard}>
                <span className={styles.paypalLogo}>Pay<b>Pal</b></span>
                <p>Ingresa tu correo asociado a PayPal</p>
              </div>
              <label className={styles.label}>Correo PayPal</label>
              <input
                className={styles.input}
                type="email"
                placeholder="tu@paypal.com"
                value={paypalEmail}
                onChange={e => setPaypalEmail(e.target.value)}
                required
              />
              <button type="submit" className={styles.payBtn}>
                <FiLock size={15} /> Pagar con PayPal — $ {total.toFixed(2)}
              </button>
            </form>
          )}

          {/* ── Tarjeta ── */}
          {method === 'card' && (
            <form onSubmit={handlePay} className={styles.form}>
              <div className={styles.cardBrands}>
                <span className={styles.brand} style={{ color: '#1A1F71' }}>VISA</span>
                <span className={styles.brand} style={{ color: '#EB001B' }}>MC</span>
                <span className={styles.brand} style={{ color: '#2E77BC' }}>AMEX</span>
              </div>

              <label className={styles.label}>Número de tarjeta</label>
              <input
                className={styles.input}
                type="text"
                placeholder="0000  0000  0000  0000"
                value={card.number}
                maxLength={19}
                onChange={e => setCard({ ...card, number: e.target.value })}
                required
              />

              <label className={styles.label}>Nombre en la tarjeta</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Como aparece en la tarjeta"
                value={card.name}
                onChange={e => setCard({ ...card, name: e.target.value })}
                required
              />

              <div className={styles.cardRow}>
                <div className={styles.cardField}>
                  <label className={styles.label}>Mes de vencimiento</label>
                  <select
                    className={styles.select}
                    value={card.month}
                    onChange={e => setCard({ ...card, month: e.target.value })}
                    required
                  >
                    <option value="">Mes</option>
                    {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className={styles.cardField}>
                  <label className={styles.label}>Año de vencimiento</label>
                  <select
                    className={styles.select}
                    value={card.year}
                    onChange={e => setCard({ ...card, year: e.target.value })}
                    required
                  >
                    <option value="">Año</option>
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div className={styles.cardField}>
                  <label className={styles.label}>CVV</label>
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="•••"
                    value={card.cvv}
                    maxLength={4}
                    onChange={e => setCard({ ...card, cvv: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button type="submit" className={styles.payBtn}>
                <FiCreditCard size={15} /> Pagar con tarjeta — $ {total.toFixed(2)}
              </button>
            </form>
          )}

          <p className={styles.secure}><FiLock size={12} /> Pago 100% seguro y encriptado</p>
        </div>

      </div>
    </div>
  );
}

export default Checkout;
