import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './form.module.scss';
import { Proposal } from '../proposal/proposal';
import { Select } from '../select/select';
import { Checkbox } from '../checkbox/checkbox';
import { Range } from '../range/range';

const DEFAULT_PURPOSE = 'default';

function Form() {
  const [purpose, setPurpose] = useState(DEFAULT_PURPOSE);
  const [price, setPrice] = useState('1200000');
  const [paymentRange, setPaymentRange] = useState(10);
  const [timeRange, setTimeRange] = useState(5);

  return (
    <form className={styles.form}>
      <div className={styles.wrapper}>
        <div className={classNames(styles.inner, styles.purpose)}>
          <h3 className={styles.title}>Шаг 1. Цель кредита</h3>
          <div className={styles.select}>
            <Select activeType={purpose} onActiveType={setPurpose} />
          </div>
        </div>
        {purpose !== DEFAULT_PURPOSE && (
          <div className={styles.inner}>
            <h3 className={styles.title}>Шаг 2. Введите параметры кредита</h3>
            <label className={classNames(styles.label, styles.price)}>
              <span className={styles.caption}>Стоимость недвижимости</span>
              <input
                className={styles.input}
                value={price}
                onChange={(evt) => setPrice(evt.target.value)}
                type="text"
              />
              <button
                className={classNames(styles.button, styles.button_minus)}
                type="button"
              />
              <button
                className={classNames(styles.button, styles.button_plus)}
                type="button"
              />
              <span className={styles.text}>
                От 1 200 000 до 25 000 000 рублей
              </span>
            </label>
            <label className={styles.label}>
              <span className={styles.caption}>Первоначальный взнос</span>
              <input className={styles.input} type="text" />
              <div className={styles.slider}>
                <Range
                  onChange={setPaymentRange}
                  value={paymentRange}
                  markFrom="10%"
                />
              </div>
            </label>
            <label className={styles.label}>
              <span className={styles.caption}>Срок кредитования</span>
              <input className={styles.input} type="text" />
              <div className={styles.slider}>
                <Range
                  onChange={setTimeRange}
                  value={timeRange}
                  min={5}
                  max={30}
                  step={1}
                  markFrom="5 лет"
                  markTo="30 лет"
                />
              </div>
            </label>
            <Checkbox>Использовать материнский капитал</Checkbox>
          </div>
        )}
      </div>
      {purpose !== DEFAULT_PURPOSE && <Proposal />}
    </form>
  );
}

export { Form };
