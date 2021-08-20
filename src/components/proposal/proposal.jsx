import React from 'react';
import styles from './proposal.module.scss';
import { Button } from '../button/button';

function Proposal() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Наше предложение</h2>
      <div className={styles.inner}>
        <div>
          <div className={styles.subtitle}>1&nbsp;330&nbsp;000&nbsp;рублей</div>
          <div>Сумма ипотеки</div>
        </div>
        <div>
          <div className={styles.subtitle}>9,40%</div>
          <div>Процентная ставка</div>
        </div>
        <div>
          <div className={styles.subtitle}>27&nbsp;868&nbsp;рублей</div>
          <div>Ежемесячный платеж</div>
        </div>
        <div>
          <div className={styles.subtitle}>61&nbsp;929&nbsp;рублей</div>
          <div>Необходимый доход</div>
        </div>
      </div>
      <Button style={{ fontSize: 16, padding: 16 }}>Оформить заявку</Button>
    </div>
  );
}

export { Proposal };
