import React, { useState } from 'react';
import styles from './Login.module.css';

const USERS = [
  { email: 'empleado@aktiva.com', password: 'empleado123', role: 'employee' },
  { email: 'cliente@aktiva.com',  password: 'cliente123',  role: 'client'   },
];

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = USERS.find(u => u.email === email && u.password === password);
    if (!user) {
      setError('Email o contraseña incorrectos.');
      return;
    }
    setError('');
    window.location.hash = user.role === 'employee' ? '#/employee' : '#/client';
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1>Iniciar Sesión</h1>
        <p>Accede a tu cuenta AKTIVA</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitBtn}>
            Iniciar Sesión
          </button>
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
          <p>¿No tienes cuenta? <a href="#/register">Regístrate aquí</a></p>
          <p><a href="#/">Volver a inicio</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
