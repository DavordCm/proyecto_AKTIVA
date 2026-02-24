import React, { useState } from 'react';
import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
    alert('Iniciando sesión con: ' + email);
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Iniciar Sesión
          </button>
        </form>

        <div className={styles.footer}>
          <p>¿No tienes cuenta? <a href="#/register">Regístrate aquí</a></p>
          <p><a href="#/">Volver a inicio</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
