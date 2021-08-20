import React from 'react';
import 'rc-slider/assets/index.css';
import styles from './calculator.module.scss';
import { Form } from '../form/form';

function Calculator() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Кредитный калькулятор</h2>
        <Form />
      </div>
    </div>
  );
}

export { Calculator };
