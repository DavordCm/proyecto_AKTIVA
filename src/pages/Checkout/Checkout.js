import { useState } from 'react';
import { FiCreditCard, FiChevronLeft, FiCheckCircle, FiLock, FiShoppingBag } from 'react-icons/fi';
import styles from './Checkout.module.css';

const MONTHS = ['01','02','03','04','05','06','07','08','09','10','11','12'];
const YEARS  = Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() + i));

function Checkout({ cartItems = [], onClearCart }) {
  const [method, setMethod] = useState('');
  const [done, setDone]     = useState(false);
  const [card, setCard]     = useState({ number: '', name: '', month: '', year: '', cvv: '' });
  const [yapePhone, setYapePhone]   = useState('');
  const [yapeTab, setYapeTab]       = useState('numero');
  const [paypalEmail, setPaypalEmail] = useState('');

  // Leer carrito desde localStorage si el prop viene vacío (viene del Client)
  const savedCart = (() => {
    try { return JSON.parse(localStorage.getItem('aktiva-checkout-cart') || '[]'); } catch { return []; }
  })();
  const items = cartItems.length > 0 ? cartItems : savedCart;

  const total    = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotal = total;
  const shipping = 0;
  const TC = 3.31; // tipo de cambio S/ por $

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
                <div className={styles.itemPriceWrap}>
                  <span className={styles.itemPrice}>$ {(item.price * item.quantity).toFixed(2)}</span>
                  <span className={styles.itemPriceSol}>S/ {(item.price * item.quantity * TC).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <div className={styles.priceStack}>
                <span>$ {subtotal.toFixed(2)}</span>
                <span className={styles.sol}>S/ {(subtotal * TC).toFixed(2)}</span>
              </div>
            </div>
            <div className={styles.totalRow}>
              <span>Envío</span>
              <span className={styles.freeShip}>Gratis</span>
            </div>
            <div className={`${styles.totalRow} ${styles.grandTotal}`}>
              <span>Total</span>
              <div className={styles.priceStack}>
                <span>$ {(subtotal + shipping).toFixed(2)}</span>
                <span className={styles.solBold}>S/ {((subtotal + shipping) * TC).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Columna derecha: pago ── */}
        <div className={styles.payment}>
          <h1 className={styles.title}>Método de Pago</h1>
          <p className={styles.sub}>Elige cómo quieres pagar</p>

          <div className={styles.methods}>
            {[
              { id: 'yape',   label: 'Yape',    img: '/yape.png',     desc: 'Transferencia instantánea' },
              { id: 'paypal', label: 'PayPal',  img: '/paypal.png',   desc: 'Pago internacional seguro' },
              { id: 'card',   label: 'Tarjeta', img: '/pngwing.com.png', desc: 'Visa · Mastercard · Amex'  },
            ].map(m => (
              <button
                key={m.id}
                type="button"
                className={`${styles.methodBtn} ${method === m.id ? styles.methodActive : ''}`}
                onClick={() => setMethod(m.id)}
              >
                <img src={m.img} alt={m.label} className={styles.methodLogo} />
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

              {/* Pestañas Número / QR */}
              <div className={styles.yapeTabs}>
                <button
                  type="button"
                  className={`${styles.yapeTabBtn} ${yapeTab === 'numero' ? styles.yapeTabActive : ''}`}
                  onClick={() => setYapeTab('numero')}
                >📱 Número</button>
                <button
                  type="button"
                  className={`${styles.yapeTabBtn} ${yapeTab === 'qr' ? styles.yapeTabActive : ''}`}
                  onClick={() => setYapeTab('qr')}
                >📷 QR</button>
              </div>

              {/* ── Opción Número ── */}
              {yapeTab === 'numero' && (
                <>
                  <div className={styles.yapeCard}>
                    <img src="/yape.png" alt="Yape" className={styles.yapeLogoImg} />
                    <p className={styles.yapeLabel}>Yapea al número</p>
                    <p className={styles.yapeNum}>+51 952 839 291</p>
                  </div>
                  <label className={styles.label}>Tu número de celular</label>
                  <div className={styles.phoneWrap}>
                    <span className={styles.phonePrefix}>+51</span>
                    <input
                      className={styles.phoneInput}
                      type="tel"
                      placeholder="987 654 321"
                      value={yapePhone}
                      onChange={e => setYapePhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                      required
                    />
                  </div>
                </>
              )}

              {/* ── Opción QR ── */}
              {yapeTab === 'qr' && (
                <>
                  <div className={styles.qrBox}>
                    <div className={styles.qrPlaceholder}>
                      <span className={styles.qrIcon}>▩</span>
                      <p className={styles.qrHint}>Escanea con tu app Yape</p>
                      <p className={styles.qrSub}>Abre Yape → Escanear QR</p>
                    </div>
                    {/* Reemplaza el div de arriba con: <img src="/tu-qr-yape.png" alt="QR Yape" className={styles.qrImg} /> */}
                  </div>
                  <label className={styles.label}>Correo para confirmación</label>
                  <input
                    className={styles.input}
                    type="email"
                    placeholder="tu@correo.com"
                    required
                  />
                  <p className={styles.qrEmailHint}>Te enviaremos la confirmación de tu pago a este correo.</p>
                </>
              )}

              <button type="submit" className={styles.payBtn}>
                <FiLock size={15} /> Confirmar pago — $ {total.toFixed(2)} <span className={styles.payBtnSol}>/ S/ {(total * TC).toFixed(2)}</span>
              </button>
            </form>
          )}

          {/* ── PayPal ── */}
          {method === 'paypal' && (
            <form onSubmit={handlePay} className={styles.form}>
              <div className={styles.paypalCard}>
                <img src="/paypal.png" alt="PayPal" className={styles.paypalLogoImg} />
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
                <FiLock size={15} /> Pagar con PayPal — $ {total.toFixed(2)} <span className={styles.payBtnSol}>/ S/ {(total * TC).toFixed(2)}</span>
              </button>
            </form>
          )}

          {/* ── Tarjeta ── */}
          {method === 'card' && (
            <form onSubmit={handlePay} className={styles.form}>
              <div className={styles.cardBrands}>
                <img src="/visa.png"        alt="Visa"       className={styles.cardLogo} />
                <img src="/mastercard.png"  alt="Mastercard" className={styles.cardLogo} />
                <img src="/scotiaban.png"   alt="Scotiabank" className={styles.cardLogo} />
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
                <FiCreditCard size={15} /> Pagar con tarjeta — $ {total.toFixed(2)} <span className={styles.payBtnSol}>/ S/ {(total * TC).toFixed(2)}</span>
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
