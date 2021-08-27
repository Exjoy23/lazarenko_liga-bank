import React from 'react';
import PropTypes from 'prop-types';
import styles from './message.module.scss';

const PurposeName = {
  MORTGAGE: 'ипотечные кредиты',
  CAR: 'автокредиты',
};

const PurposePrice = {
  MORTGAGE: '500\xA0000\xA0рублей',
  CAR: '200\xA0000\xA0рублей',
};

function Message({ purpose }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        Наш банк не выдаёт {PurposeName[purpose]} меньше {PurposePrice[purpose]}
        .
      </h2>
      <p className={styles.text}>
        Попробуйте использовать другие
        <br />
        параметры для расчёта.
      </p>
    </div>
  );
}

Message.propTypes = {
  purpose: PropTypes.string.isRequired,
};

export { Message };
