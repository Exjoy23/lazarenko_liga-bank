import React from 'react';
import PropTypes from 'prop-types';
import styles from './proposal.module.scss';
import { Button } from '../button/button';

const SumName = {
  MORTGAGE: 'ипотеки',
  CAR: 'автокредита',
};

function Proposal({ purpose, sum, percent, payment, profit }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Наше предложение</h2>
      <div className={styles.inner}>
        <div>
          <div className={styles.subtitle}>{sum}</div>
          <div>Сумма {SumName[purpose]}</div>
        </div>
        <div>
          <div className={styles.subtitle}>{percent}%</div>
          <div>Процентная ставка</div>
        </div>
        <div>
          <div className={styles.subtitle}>{payment}</div>
          <div>Ежемесячный платеж</div>
        </div>
        <div>
          <div className={styles.subtitle}>{profit}</div>
          <div>Необходимый доход</div>
        </div>
      </div>
      <Button style={{ fontSize: 16, padding: 16 }}>Оформить заявку</Button>
    </div>
  );
}

Proposal.propTypes = {
  purpose: PropTypes.string.isRequired,
  sum: PropTypes.string.isRequired,
  percent: PropTypes.number.isRequired,
  payment: PropTypes.string.isRequired,
  profit: PropTypes.string.isRequired,
};

export { Proposal };
