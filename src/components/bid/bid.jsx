import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import styles from './bid.module.scss';
import { Button } from '../button/button';
import { Popup } from '../popup/popup';
import useLocalStorage from '../../hooks/use-local-storage';

const PurposeName = {
  MORTGAGE: 'Ипотека',
  CAR: 'Автокредит',
};
const PriceName = {
  MORTGAGE: 'недвижимости',
  CAR: 'автомобиля',
};
const FieldName = {
  name: 'name',
  phone: 'phone',
  email: 'email',
};

let count = 1;

function Bid({ purpose, price, payment, time }) {
  const [name, setName] = useLocalStorage(FieldName.name, '');
  const [phone, setPhone] = useLocalStorage(FieldName.phone, '');
  const [email, setEmail] = useLocalStorage(FieldName.email, '');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    setIsPopupOpen(true);
    count++;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Шаг 3. Оформление заявки</h2>
        <dl className={styles.list}>
          <dt className={styles.term}>Номер заявки</dt>
          <dd className={styles.definition}>№ {count}</dd>
          <dt className={styles.term}>Цель кредита</dt>
          <dd className={styles.definition}>{PurposeName[purpose]}</dd>
          <dt className={styles.term}>Стоимость {PriceName[purpose]}</dt>
          <dd className={styles.definition}>{price}</dd>
          <dt className={styles.term}>Первоначальный взнос</dt>
          <dd className={styles.definition}>{payment}</dd>
          <dt className={styles.term}>Срок кредитования</dt>
          <dd className={styles.definition}>{time}</dd>
        </dl>
        <form className={styles.form} onSubmit={onFormSubmit}>
          <label className={classNames(styles.label, styles.name)}>
            <input
              className={styles.input}
              value={name}
              onChange={(evt) => setName(evt.target.value)}
              type="text"
              placeholder="ФИО"
              ref={nameRef}
            />
          </label>
          <label className={styles.label}>
            <InputMask
              className={styles.input}
              value={phone}
              onChange={(evt) => setPhone(evt.target.value)}
              placeholder="Телефон"
              mask="+7 (999) 999-99-99"
            />
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              type="email"
              placeholder="E-mail"
            />
          </label>
          <div className={styles.button}>
            <Button style={{ width: '100%', fontSize: 16, padding: 17 }}>
              Отправить
            </Button>
          </div>
        </form>
        <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      </div>
    </div>
  );
}

Bid.propTypes = {
  purpose: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  payment: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export { Bid };
