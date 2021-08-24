import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './form.module.scss';
import { Proposal } from '../proposal/proposal';
import { Select } from '../select/select';
import { Checkbox } from '../checkbox/checkbox';
import { Range } from '../range/range';

const DEFAULT_PURPOSE = 'DEFAULT';
const DEFAULT_VALUE = '';
const DEFAULT_RANGE_VALUE = 0;
const MAX_PERCENT = 100;
const TIME_TITLES = ['год', 'года', 'лет'];
const CURRENCY_TITLES = ['рубль', 'рубля', 'рублей'];

const LoanPurpose = {
  MORTGAGE: {
    MIN_PRICE: 1200000,
    MAX_PRICE: 25000000,
    STEP_PRICE: 100000,
    MIN_TIME: 5,
    MAX_TIME: 30,
    STEP_TIME: 1,
    MIN_PERCENT: 10,
  },
};

const declOfNum = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};

const getNumber = (value) => +value.replace(/[^\d]/g, '');

const divideNumberByPieces = (number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const glueString = (string) => string.split(' ').join('');
const getMoneyString = (value) =>
  `${divideNumberByPieces(value)} ${declOfNum(value, CURRENCY_TITLES)}`;
const getMoneyNumber = (value) => getNumber(glueString(value));

function Form() {
  const [purpose, setPurpose] = useState(DEFAULT_PURPOSE);
  const [price, setPrice] = useState(DEFAULT_VALUE);
  const [payment, setPayment] = useState(DEFAULT_VALUE);
  const [paymentRange, setPaymentRange] = useState(DEFAULT_RANGE_VALUE);
  const [time, setTime] = useState(DEFAULT_VALUE);
  const [timeRange, setTimeRange] = useState(DEFAULT_RANGE_VALUE);

  const getProposalPercent = () => {
    if (purpose === 'MORTGAGE') {
      if (paymentRange >= 15) {
        return 8.5;
      }

      return 9.4;
    }
  };

  const proposal = {
    sum: price - payment,
    percent: getProposalPercent(),
    payment: 27000,
    profit: 30000,
  };

  useEffect(() => {
    if (purpose !== DEFAULT_PURPOSE) {
      setPrice(getMoneyString(LoanPurpose[purpose].MIN_PRICE));
      setPaymentRange(LoanPurpose[purpose].MIN_PERCENT);
      setPayment(
        getMoneyString(
          Math.round(LoanPurpose[purpose].MIN_PRICE / MAX_PERCENT) *
            LoanPurpose[purpose].MIN_PERCENT,
        ),
      );
      setTime(
        `${LoanPurpose[purpose].MIN_TIME} ${declOfNum(
          LoanPurpose[purpose].MIN_TIME,
          TIME_TITLES,
        )}`,
      );
      setTimeRange(LoanPurpose[purpose].MIN_TIME);
    }
  }, [purpose]);

  const onPriceChange = (evt) => {
    const value = getMoneyNumber(evt.target.value);
    setPrice(value);
    setPayment(
      getMoneyString(Math.round((value / MAX_PERCENT) * +paymentRange)),
    );
  };

  const onPriceBlur = (evt) => {
    const value = getMoneyNumber(evt.target.value);

    if (value < LoanPurpose[purpose].MIN_PRICE) {
      setPrice(getMoneyString(LoanPurpose[purpose].MIN_PRICE));
      setPayment(
        getMoneyString(
          Math.round(
            (LoanPurpose[purpose].MIN_PRICE / MAX_PERCENT) * +paymentRange,
          ),
        ),
      );
      return;
    }

    if (value > LoanPurpose[purpose].MAX_PRICE) {
      setPrice(getMoneyString(LoanPurpose[purpose].MAX_PRICE));
      setPayment(
        getMoneyString(
          Math.round(
            (LoanPurpose[purpose].MAX_PRICE / MAX_PERCENT) * +paymentRange,
          ),
        ),
      );
      return;
    }

    setPrice(getMoneyString(value));
    setPayment(
      getMoneyString(Math.round((value / MAX_PERCENT) * +paymentRange)),
    );
  };

  const onPriceFocus = (evt) => {
    setPrice(getMoneyNumber(evt.target.value));
  };

  const onPriceButtonClick = (_, subtraction) => {
    let step = LoanPurpose[purpose].STEP_PRICE;

    if (subtraction) {
      step = step * -1;
    }

    setPrice((state) => {
      setPayment(
        getMoneyString(
          Math.round(
            ((getMoneyNumber(state) + step) / MAX_PERCENT) * +paymentRange,
          ),
        ),
      );

      return getMoneyString(getMoneyNumber(state) + step);
    });
  };

  const onPaymentChange = (evt) => {
    const value = getMoneyNumber(evt.target.value);
    setPayment(value);
    setPaymentRange((value / getMoneyNumber(price)) * MAX_PERCENT);
  };

  const onPaymentBlur = (evt) => {
    const value = getMoneyNumber(evt.target.value);
    const numberPrice = getMoneyNumber(price);

    if (
      (value / numberPrice) * MAX_PERCENT <
      LoanPurpose[purpose].MIN_PERCENT
    ) {
      setPayment(
        getMoneyString(
          (numberPrice / MAX_PERCENT) * LoanPurpose[purpose].MIN_PERCENT,
        ),
      );
      return;
    }

    if ((value / numberPrice) * MAX_PERCENT > MAX_PERCENT) {
      setPayment(getMoneyString((numberPrice / MAX_PERCENT) * MAX_PERCENT));
      return;
    }

    setPayment(getMoneyString(value));
  };

  const onPaymentFocus = (evt) => {
    setPayment(getMoneyNumber(evt.target.value));
  };

  const onPaymentRangeChange = (evt) => {
    const value = +evt.target.value;
    setPaymentRange(value);
    setPayment(
      getMoneyString(Math.round((getMoneyNumber(price) / MAX_PERCENT) * value)),
    );
  };

  const onTimeChange = (evt) => {
    const value = evt.target.value;
    setTime(value);
    setTimeRange(getNumber(value));
  };

  const onTimeBlur = () => {
    if (time > LoanPurpose[purpose].MAX_TIME) {
      setTime(
        `${LoanPurpose[purpose].MAX_TIME} ${declOfNum(
          LoanPurpose[purpose].MAX_TIME,
          TIME_TITLES,
        )}`,
      );
      return;
    }

    if (time < LoanPurpose[purpose].MIN_TIME) {
      setTime(
        `${LoanPurpose[purpose].MIN_TIME} ${declOfNum(
          LoanPurpose[purpose].MIN_TIME,
          TIME_TITLES,
        )}`,
      );
      return;
    }

    setTime(`${time} ${declOfNum(time, TIME_TITLES)}`);
  };

  const onTimeFocus = () => {
    setTime(getNumber(time.toString()));
  };

  const onTimeRangeChange = (evt) => {
    const value = +evt.target.value;
    setTimeRange(value);
    setTime(`${value} ${declOfNum(value, TIME_TITLES)}`);
  };

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
                onChange={onPriceChange}
                onBlur={onPriceBlur}
                onFocus={onPriceFocus}
                type="text"
              />
              <button
                className={classNames(styles.button, styles.button_minus)}
                onClick={(evt) => onPriceButtonClick(evt, true)}
                type="button"
              />
              <button
                className={classNames(styles.button, styles.button_plus)}
                onClick={onPriceButtonClick}
                type="button"
              />
              <span className={styles.text}>
                От {divideNumberByPieces(LoanPurpose[purpose].MIN_PRICE)} до{' '}
                {divideNumberByPieces(LoanPurpose[purpose].MAX_PRICE)} рублей
              </span>
            </label>
            <label className={styles.label}>
              <span className={styles.caption}>Первоначальный взнос</span>
              <input
                className={styles.input}
                value={payment}
                onChange={onPaymentChange}
                onBlur={onPaymentBlur}
                onFocus={onPaymentFocus}
                type="text"
              />
              <div className={styles.slider}>
                <Range
                  onChange={onPaymentRangeChange}
                  value={paymentRange}
                  markFrom={`${LoanPurpose[purpose].MIN_PERCENT}%`}
                />
              </div>
            </label>
            <label className={styles.label}>
              <span className={styles.caption}>Срок кредитования</span>
              <input
                className={styles.input}
                value={time}
                onChange={onTimeChange}
                onBlur={onTimeBlur}
                onFocus={onTimeFocus}
                type="text"
              />
            </label>
            <div className={styles.slider}>
              <Range
                onChange={onTimeRangeChange}
                value={timeRange}
                min={LoanPurpose[purpose].MIN_TIME}
                max={LoanPurpose[purpose].MAX_TIME}
                step={LoanPurpose[purpose].STEP_TIME}
                markFrom={`${LoanPurpose[purpose].MIN_TIME} лет`}
                markTo={`${LoanPurpose[purpose].MAX_TIME} лет`}
              />
            </div>
            {/* <Checkbox>Использовать материнский капитал</Checkbox> */}
          </div>
        )}
      </div>
      {purpose !== DEFAULT_PURPOSE && <Proposal {...proposal} />}
    </form>
  );
}

export { Form };
