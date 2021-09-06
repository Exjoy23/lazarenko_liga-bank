import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import styles from './bid.module.scss';
import { Button } from '../button/button';
import { Popup } from '../popup/popup';
import useLocalStorage from '../../hooks/use-local-storage';
import { validatePhoneNumber } from '../../utils';

const TIMEOUT = 700;
const COUNT_LENGTH = 4;
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

function Bid({ purpose, price, payment, time, onDataSet }) {
  const [name, setName] = useLocalStorage(FieldName.name, '');
  const [phone, setPhone] = useLocalStorage(FieldName.phone, '');
  const [email, setEmail] = useLocalStorage(FieldName.email, '');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (nameError) {
        setNameError(false);
      }

      if (phoneError) {
        setPhoneError(false);
      }

      if (emailError) {
        setEmailError(false);
      }
    }, TIMEOUT);

    return () => {
      clearTimeout(timer);
    };
  }, [nameError, phoneError, emailError]);

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    if (!name) {
      setNameError(true);
    }

    if (!validatePhoneNumber(phone)) {
      setPhoneError(true);
    }

    if (!email) {
      setEmailError(true);
    }

    if (name && validatePhoneNumber(phone) && email) {
      setIsPopupOpen(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Шаг 3. Оформление заявки</h2>
        <dl className={styles.list}>
          <dt className={styles.term}>Номер заявки</dt>
          <dd className={styles.definition}>
            № {count.toString().padStart(COUNT_LENGTH, '0')}
          </dd>
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
              className={classNames(
                styles.input,
                nameError && styles.input_error,
              )}
              value={name}
              onChange={(evt) => setName(evt.target.value)}
              type="text"
              placeholder="ФИО"
              ref={nameRef}
              aria-label="ФИО"
            />
          </label>
          <label className={styles.label}>
            <InputMask
              className={classNames(
                styles.input,
                phoneError && styles.input_error,
              )}
              value={phone}
              onChange={(evt) => setPhone(evt.target.value)}
              placeholder="Телефон"
              mask="+7 (999) 999-99-99"
              aria-label="Телефон"
            />
          </label>
          <label className={styles.label}>
            <input
              className={classNames(
                styles.input,
                emailError && styles.input_error,
              )}
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              type="email"
              placeholder="E-mail"
              aria-label="Email"
            />
          </label>
          <div className={styles.button}>
            <Button style={{ width: '100%', fontSize: 16, padding: 17 }}>
              Отправить
            </Button>
          </div>
        </form>
        <Popup
          isOpen={isPopupOpen}
          onClose={() => {
            setIsPopupOpen(false);
            onDataSet((state) => ({ ...state, purpose: '' }));
            count++;
          }}
        />
      </div>
    </div>
  );
}

Bid.propTypes = {
  purpose: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  payment: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  onDataSet: PropTypes.func.isRequired,
};

export { Bid };
