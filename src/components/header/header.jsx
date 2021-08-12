import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './header.module.scss';
import logo from '../../assets/img/logo.svg';

function Header() {
  const [isMenuActive, setIsMenuActive] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <div className={styles.menu}>
            <button
              className={styles.button}
              type="button"
              onClick={() => setIsMenuActive((state) => !state)}
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
              <a href="/">Услуги</a>
            </li>
            <li className={styles.item}>
              <a href="/">Рассчитать кредит</a>
            </li>
            <li className={styles.item}>
              <a href="/">Конвертер валют</a>
            </li>
            <li className={styles.item}>
              <a href="/">Контакты</a>
            </li>
          </ul>
          <a
            className={classNames(
              styles.login,
              isMenuActive && styles.login_active,
            )}
            href="/"
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
    </header>
  );
}

export { Header };
