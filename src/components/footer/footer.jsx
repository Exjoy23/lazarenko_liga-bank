import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './footer.module.scss';
import logo from '../../assets/img/logo.svg';
import facebook from '../../assets/img/facebook.svg';
import instagram from '../../assets/img/instagram.svg';
import twitter from '../../assets/img/twitter.svg';
import youtube from '../../assets/img/youtube.svg';

function Footer() {
  return (
    <footer className={styles.footer} id="contacts">
      <div className={styles.wrapper}>
        <div className={styles.address}>
          <img
            className={styles.logo}
            width="148"
            height="25"
            src={logo}
            alt="Логотип Лига банка"
          />
          <p className={classNames(styles.text, styles.copyright)}>
            150015, г. Москва, ул. Московская, д. 32 Генеральная лицензия Банка
            России №1050 Ⓒ Лига Банк, 2019
          </p>
        </div>
        <ul className={classNames(styles.list, styles.nav)}>
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
            <a className={styles.link} href="#contacts">
              Контакты
            </a>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} to="/">
              Задать вопрос
            </Link>
          </li>
        </ul>
        <div className={styles.mobile}>
          <p className={classNames(styles.title, styles.title_mobile)}>*0904</p>
          <p className={styles.text}>
            Бесплатно для абонентов МТС, Билайн, Мегафон, Теле2
          </p>
        </div>
        <div className={styles.phone}>
          <p className={classNames(styles.title, styles.title_phone)}>
            8 800 111 22 33
          </p>
          <p className={styles.text}>Бесплатный для всех городов России</p>
        </div>
        <ul className={classNames(styles.list, styles.socials)}>
          <li className={styles.social}>
            <a className={styles.link} href="https://facebook.com/">
              <img width="10" height="16" src={facebook} alt="facebook" />
            </a>
          </li>
          <li className={styles.social}>
            <a className={styles.link} href="https://www.instagram.com/">
              <img width="16" height="16" src={instagram} alt="instagram" />
            </a>
          </li>
          <li className={styles.social}>
            <a className={styles.link} href="https://twitter.com/">
              <img width="16" height="13" src={twitter} alt="twitter" />
            </a>
          </li>
          <li className={styles.social}>
            <a className={styles.link} href="https://www.youtube.com/">
              <img width="16" height="13" src={youtube} alt="youtube" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export { Footer };
