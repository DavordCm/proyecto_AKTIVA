import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import styles from './Login.module.css';

const USERS = [
  { email: 'empleado@aktiva.com', password: 'empleado123', role: 'employee' },
  { email: 'cliente@aktiva.com',  password: 'cliente123',  role: 'client'   },
];

function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = USERS.find(u => u.email === email && u.password === password);
    if (!user) { setError('Email o contraseña incorrectos.'); return; }
    setError('');
    window.location.hash = user.role === 'employee' ? '#/empleado' : '#/cliente';
  };

  return (
    <div className={styles.page}>
      {/* Panel izquierdo — marca */}
      <div className={styles.brand}>
        <img src="/a93cb6ff-4b3d-4dbb-88ea-fe8ca6ae5d86.png" alt="AKTIVA" className={styles.brandLogo} />
        <h2>Bienvenido</h2>
        <p>Ingresa a tu cuenta para explorar y comprar nuestras barras energéticas andinas.</p>
        <div className={styles.brandPills}>
          <span>🌾 100% Natural</span>
          <span>⚡ Sin azúcar añadido</span>
          <span>🏔️ Hecho en Perú</span>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className={styles.formPanel}>
        <div className={styles.formBox}>
          <h1>Iniciar Sesión</h1>
          <p className={styles.sub}>Accede a tu cuenta AKTIVA</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="email">Correo electrónico</label>
              <div className={styles.inputWrap}>
                <FiMail size={16} className={styles.inputIcon} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Contraseña</label>
              <div className={styles.inputWrap}>
                <FiLock size={16} className={styles.inputIcon} />
                <input
                  type={showPass ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  required
                />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowPass(!showPass)}>
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.submitBtn}>Iniciar Sesión</button>
          </form>

          <div className={styles.demoBox}>
            <p className={styles.demoTitle}>Usuarios de prueba</p>
            <div className={styles.demoUser}>
              <span className={styles.demoRole}>Empleado</span>
              <span>empleado@aktiva.com</span>
              <span className={styles.demoPass}>empleado123</span>
            </div>
            <div className={styles.demoUser}>
              <span className={styles.demoRole}>Cliente</span>
              <span>cliente@aktiva.com</span>
              <span className={styles.demoPass}>cliente123</span>
            </div>
          </div>

          <div className={styles.footer}>
            <p>¿No tienes cuenta? <a href="#/registrarse">Regístrate aquí</a></p>
            <p><a href="#/">← Volver al inicio</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
