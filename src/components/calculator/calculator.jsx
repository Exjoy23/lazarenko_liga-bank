import React, { useState } from 'react';
import styles from './calculator.module.scss';
import { Form } from '../form/form';
import { Bid } from '../bid/bid';

function Calculator() {
  const [data, setData] = useState({
    purpose: '',
    price: '',
    payment: '',
    time: '',
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Кредитный калькулятор</h2>
        <Form onDataSet={setData} />
        {data.purpose && <Bid onDataSet={setData} {...data} />}
      </div>
    </div>
  );
}

export { Calculator };
