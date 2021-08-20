import React, { useState } from 'react';
import classNames from 'classnames';
import Slider from 'rc-slider';
import styles from './form.module.scss';
import { Proposal } from '../proposal/proposal';

function Form() {
  const [purpose, setPurpose] = useState(0);
  const [price, setPrice] = useState('1200000');
  const [paymentSlider, setPaymentSlider] = useState(10);
  const [timeSlider, setTimeSlider] = useState(5);

  return (
    <form className={styles.form}>
      <div className={styles.wrapper}>
        <div className={classNames(styles.inner, styles.purpose)}>
          <h3 className={styles.title}>Шаг 1. Цель кредита</h3>
          <label className={styles.inner}>
            <select
              className={classNames(styles.input, styles.select)}
              value={purpose}
              onChange={(evt) => setPurpose(evt.target.value)}
            >
              <option style={{ display: 'none' }} value="0" disabled>
                Выберите цель кредита
              </option>
              <option value="mortgage">Ипотечное кредитование</option>
              <option value="car">Автомобильное кредитование</option>
            </select>
          </label>
        </div>
        {!!purpose && (
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
                <Slider
                  value={paymentSlider}
                  onChange={setPaymentSlider}
                  marks={{ [paymentSlider]: `${paymentSlider}%` }}
                  min={10}
                  max={100}
                  step={5}
                  railStyle={{
                    backgroundColor: '#C1C2CA',
                    height: 1,
                    marginTop: 1.5,
                  }}
                  trackStyle={{
                    background: '#000000',
                    height: 1,
                    marginTop: 1.5,
                  }}
                  handleStyle={{
                    height: 14,
                    width: 14,
                    backgroundColor: '#2C36F2',
                    border: 0,
                  }}
                />
              </div>
            </label>
            <label className={styles.label}>
              <span className={styles.caption}>Срок кредитования</span>
              <input className={styles.input} type="text" />
              <div className={styles.slider}>
                <Slider
                  value={timeSlider}
                  onChange={setTimeSlider}
                  marks={{ 5: '5 лет', 30: '30\u00A0лет' }}
                  min={5}
                  max={30}
                  step={1}
                  railStyle={{
                    backgroundColor: '#C1C2CA',
                    height: 1,
                    marginTop: 1.5,
                  }}
                  trackStyle={{
                    background: '#000000',
                    height: 1,
                    marginTop: 1.5,
                  }}
                  handleStyle={{
                    height: 14,
                    width: 14,
                    backgroundColor: '#2C36F2',
                    border: 0,
                  }}
                />
              </div>
            </label>
            <label>
              <input className={styles.checkbox} type="checkbox" />
              <span className={styles.flag}>
                {' '}
                Использовать материнский капитал
              </span>
            </label>
          </div>
        )}
      </div>
      {!!purpose && <Proposal />}
    </form>
  );
}

export { Form };
