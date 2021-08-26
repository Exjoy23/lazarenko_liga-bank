import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './form.module.scss';
import { Proposal } from '../proposal/proposal';
import { Select } from '../select/select';
import { Checkbox } from '../checkbox/checkbox';
import { Range } from '../range/range';
import {
  TIME_TITLES,
  PurposeNames,
  declOfNum,
  getNumber,
  getMoneyString,
  divideNumberByPieces,
  getTime,
} from '../../utils';

const DEFAULT_VALUE = '';
const DEFAULT_RANGE_VALUE = 0;
const MAX_PERCENT = 100;
const MONTHS_IN_YEAR = 12;
const MATERNITY_CAPITAL = 470000;
const CAR_PRICE = 2000000;
const LoanPurpose = {
  MORTGAGE: {
    NAME: 'недвижимости',
    MIN_PRICE: 1200000,
    MAX_PRICE: 25000000,
    STEP_PRICE: 100000,
    MIN_TIME: 5,
    MAX_TIME: 30,
    STEP_TIME: 1,
    MIN_PERCENT: 10,
  },
  CAR: {
    NAME: 'автомобиля',
    MIN_PRICE: 500000,
    MAX_PRICE: 5000000,
    STEP_PRICE: 50000,
    MIN_TIME: 1,
    MAX_TIME: 5,
    STEP_TIME: 1,
    MIN_PERCENT: 20,
  },
};

function Form() {
  const [purpose, setPurpose] = useState(PurposeNames.DEFAULT);
  const [price, setPrice] = useState(DEFAULT_VALUE);
  const [payment, setPayment] = useState(DEFAULT_VALUE);
  const [paymentRange, setPaymentRange] = useState(DEFAULT_RANGE_VALUE);
  const [time, setTime] = useState(DEFAULT_VALUE);
  const [timeRange, setTimeRange] = useState(DEFAULT_RANGE_VALUE);
  const [capital, setCapital] = useState(false);
  const [casco, setCasco] = useState(false);
  const [insurance, setInsurance] = useState(false);

  useEffect(() => {
    if (purpose !== PurposeNames.DEFAULT) {
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

  const getProposalPercent = () => {
    if (purpose === PurposeNames.MORTGAGE) {
      if (paymentRange >= 15) {
        return 8.5;
      }

      return 9.4;
    }

    if (purpose === PurposeNames.CAR) {
      if (casco && insurance) {
        return 3.5;
      }

      if (casco || insurance) {
        return 8.5;
      }

      if (getNumber(price) < CAR_PRICE) {
        return 16;
      }

      if (getNumber(price) >= CAR_PRICE) {
        return 15;
      }
    }
  };

  const getProposalSum = () =>
    getNumber(price) - getNumber(payment) - (capital ? MATERNITY_CAPITAL : 0);

  const getProposalPayment = () => {
    const rate = getProposalPercent() / MAX_PERCENT / MONTHS_IN_YEAR;
    return Math.round(
      getProposalSum() *
        (rate + rate / ((1 + rate) ** (timeRange * MONTHS_IN_YEAR) - 1)),
    );
  };

  const getProposalProfit = () =>
    Math.round((getProposalPayment() / 45) * MAX_PERCENT);

  const proposal = {
    purpose,
    sum: getMoneyString(getProposalSum()),
    percent: getProposalPercent(),
    payment: getMoneyString(getProposalPayment()),
    profit: getMoneyString(getProposalProfit()),
  };

  const onPriceChange = (evt) => {
    const value = getNumber(evt.target.value);

    if (value <= LoanPurpose[purpose].MAX_PRICE) {
      setPrice(value);
      setPayment(
        getMoneyString(Math.round((value / MAX_PERCENT) * +paymentRange)),
      );
    }
  };

  const onPriceBlur = (evt) => {
    const value = getNumber(evt.target.value);

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
    setPrice(getNumber(evt.target.value));
  };

  const onPriceButtonClick = (_, subtraction) => {
    let step = LoanPurpose[purpose].STEP_PRICE;

    if (subtraction) {
      step = step * -1;
    }

    setPrice((state) => {
      setPayment(
        getMoneyString(
          Math.round(((getNumber(state) + step) / MAX_PERCENT) * +paymentRange),
        ),
      );

      return getMoneyString(getNumber(state) + step);
    });
  };

  const onPaymentChange = (evt) => {
    const value = getNumber(evt.target.value);
    setPayment(value);
    setPaymentRange((value / getNumber(price)) * MAX_PERCENT);
  };

  const onPaymentBlur = (evt) => {
    const value = getNumber(evt.target.value);
    const numberPrice = getNumber(price);

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
    setPayment(getNumber(evt.target.value));
  };

  const onPaymentRangeChange = (evt) => {
    const value = +evt.target.value;
    setPaymentRange(value);
    setPayment(
      getMoneyString(Math.round((getNumber(price) / MAX_PERCENT) * value)),
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
    setTime(getTime(value));
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
        {purpose !== PurposeNames.DEFAULT && (
          <div className={styles.inner}>
            <h3 className={styles.title}>Шаг 2. Введите параметры кредита</h3>
            <label className={classNames(styles.label, styles.price)}>
              <span className={styles.caption}>
                Стоимость {LoanPurpose[purpose].NAME}
              </span>
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
                  min={LoanPurpose[purpose].MIN_PERCENT}
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
                markFrom={getTime(LoanPurpose[purpose].MIN_TIME)}
                markTo={getTime(LoanPurpose[purpose].MAX_TIME)}
              />
            </div>
            {purpose === PurposeNames.MORTGAGE && (
              <Checkbox value={capital} onChange={setCapital}>
                Использовать материнский капитал
              </Checkbox>
            )}
            {purpose === PurposeNames.CAR && (
              <>
                <Checkbox value={casco} onChange={setCasco}>
                  Оформить КАСКО в нашем банке
                </Checkbox>
                <Checkbox value={insurance} onChange={setInsurance}>
                  Оформить Страхование жизни в нашем банке
                </Checkbox>
              </>
            )}
          </div>
        )}
      </div>
      {purpose !== PurposeNames.DEFAULT && <Proposal {...proposal} />}
    </form>
  );
}

export { Form };
