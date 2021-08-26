import React from 'react';
import classNames from 'classnames';
import styles from './bid.module.scss';
import { Button } from '../button/button';

function Bid() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Шаг 3. Оформление заявки</h2>
        <dl className={styles.list}>
          <dt className={styles.term}>Номер заявки</dt>
          <dd className={styles.definition}>№ 0010</dd>
          <dt className={styles.term}>Цель кредита</dt>
          <dd className={styles.definition}>Ипотека</dd>
          <dt className={styles.term}>Стоимость недвижимости</dt>
          <dd className={styles.definition}>2 000 000 рублей</dd>
          <dt className={styles.term}>Первоначальный взнос</dt>
          <dd className={styles.definition}>200 000 рублей</dd>
          <dt className={styles.term}>Срок кредитования</dt>
          <dd className={styles.definition}>5 лет</dd>
        </dl>
        <form className={styles.form}>
          <label className={classNames(styles.label, styles.name)}>
            <input
              className={styles.input}
              type="text"
              placeholder="ФИО"
              required
            />
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="tel"
              pattern="[0-9]{1}-[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="Телефон"
              required
            />
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="email"
              placeholder="E-mail"
              required
            />
          </label>
          <div className={styles.button}>
            <Button style={{ width: '100%', fontSize: 16, padding: 17 }}>
              Отправить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { Bid };
