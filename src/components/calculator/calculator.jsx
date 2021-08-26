import React from 'react';
import styles from './calculator.module.scss';
import { Form } from '../form/form';
import { Bid } from '../bid/bid';

function Calculator() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Кредитный калькулятор</h2>
        <Form />
        <Bid />
      </div>
    </div>
  );
}

export { Calculator };
