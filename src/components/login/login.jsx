import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import styles from './login.module.scss';
import useLocalStorage from '../../hooks/use-local-storage';
import { Button } from '../button/button';
import logo from '../../assets/img/logo-modal.svg';

const ModalFields = {
  LOGIN: 'login',
  PASSWORD: 'password',
};

function Login({ isOpen, onActive }) {
  const [login, setLogin] = useLocalStorage(ModalFields.LOGIN, '');
  const [password, setPassword] = useLocalStorage(ModalFields.LOGIN, '');
  const [isVisible, setIsVisible] = useState(false);

  const loginRef = useRef(null);

  return (
    <ReactModal
      className={styles.modal}
      isOpen={isOpen}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      onRequestClose={() => onActive(false)}
      onAfterOpen={() => loginRef.current.focus()}
      style={{
        overlay: { backgroundColor: 'rgba(88, 87, 87, 0.6)', zIndex: '10' },
      }}
      ariaHideApp={false}
    >
      <div className={styles.inner}>
        <img width="151" height="31" src={logo} alt="Логотип Лига банка" />
        <button
          className={styles.button}
          onClick={() => {
            onActive(false);
          }}
          type="button"
        />
      </div>
      <form className={styles.form}>
        <label className={styles.label}>
          <span className={styles.text}>Логин</span>
          <input
            className={styles.input}
            onChange={(evt) => {
              setLogin(evt.target.value);
            }}
            value={login}
            type="text"
            aria-label="Логин"
            required
            ref={loginRef}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.text}>Пароль</span>
          <input
            className={styles.input}
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}
            value={password}
            type={isVisible ? 'text' : 'password'}
            aria-label="Пароль"
            required
          />
          <button
            className={styles.visible}
            onMouseDown={() => setIsVisible(true)}
            onMouseUp={() => setIsVisible(false)}
            onMouseLeave={() => setIsVisible(false)}
            onTouchStart={() => setIsVisible(true)}
            onTouchEnd={() => setIsVisible(false)}
            type="button"
          />
        </label>
        <a className={styles.link} href="/">
          Забыли пароль?
        </a>
        <Button>Войти</Button>
      </form>
    </ReactModal>
  );
}

Login.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onActive: PropTypes.func.isRequired,
};

export { Login };
