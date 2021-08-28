import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './header.module.scss';
import logo from '../../assets/img/logo.svg';
import { Login } from '../login/login';

function Header() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    if (isModalActive) {
      document.body.style = 'overflow: hidden;';
    }

    if (!isModalActive) {
      document.body.style = 'overflow: visible;';
    }
  }, [isModalActive]);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <div className={styles.menu}>
            <button
              className={styles.button}
              type="button"
              onClick={() => setIsMenuActive((state) => !state)}
              aria-label="меню"
            />
          </div>
          <div className={styles.logo}>
            <img src={logo} alt="Логотип Лига банка" />
          </div>
        </div>
        <nav
          className={classNames(styles.nav, isMenuActive && styles.nav_active)}
        >
          <ul
            className={classNames(
              styles.list,
              isMenuActive && styles.list_active,
            )}
          >
            <li className={styles.item}>
              <a className={styles.link} href="#services">
                Услуги
              </a>
            </li>
            <li className={styles.item}>
              <a className={styles.link} href="#calculator">
                Рассчитать кредит
              </a>
            </li>
            <li className={styles.item}>
              <a className={styles.link} href="/">
                Конвертер валют
              </a>
            </li>
            <li className={styles.item}>
              <a className={styles.link} href="#contacts">
                Контакты
              </a>
            </li>
          </ul>
          <a
            className={classNames(
              styles.login,
              isMenuActive && styles.login_active,
              styles.link,
            )}
            href="/"
            onClick={(evt) => {
              evt.preventDefault();
              setIsModalActive(true);
            }}
          >
            Войти в Интернет-банк
          </a>
          {isMenuActive && (
            <button
              className={classNames(styles.button, styles.button_close)}
              type="button"
              onClick={() => setIsMenuActive(false)}
            />
          )}
        </nav>
      </div>
      <Login isOpen={isModalActive} onActive={setIsModalActive} />
    </header>
  );
}

export { Header };
