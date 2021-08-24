import React from 'react';
import PropTypes from 'prop-types';
import styles from './proposal.module.scss';
import { Button } from '../button/button';

function Proposal({ sum, percent, payment, profit }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Наше предложение</h2>
      <div className={styles.inner}>
        <div>
          <div className={styles.subtitle}>{sum} рублей</div>
          <div>Сумма ипотеки</div>
        </div>
        <div>
          <div className={styles.subtitle}>{percent}%</div>
          <div>Процентная ставка</div>
        </div>
        <div>
          <div className={styles.subtitle}>{payment} рублей</div>
          <div>Ежемесячный платеж</div>
        </div>
        <div>
          <div className={styles.subtitle}>{profit} рублей</div>
          <div>Необходимый доход</div>
        </div>
      </div>
      <Button style={{ fontSize: 16, padding: 16 }}>Оформить заявку</Button>
    </div>
  );
}

Proposal.propTypes = {
  sum: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
  payment: PropTypes.number.isRequired,
  profit: PropTypes.number.isRequired,
};

export { Proposal };
