import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './converter-form.module.scss';
import { ConverterInput } from '../converter-input/converter-input';
import { addHistory, addRates } from '../../store/actions';
import { Button } from '../button/button';

const DIFFERENCE = 7;
const MIN_VALUE = '0';
const USD = 'USD';
const RUB = 'RUB';
const FIX = 4;
const MAX_LENGTH = 10;
const BACKEND_URL = 'https://openexchangerates.org/api/historical';
const APP_ID = '.json?app_id=d3e503d72f284685b5d0c042551877ab';

let id = 1;

const getFormattedValue = (value) => value.toFixed(FIX).replace(/\.0+$/, '');

function ConverterForm() {
  const dispatch = useDispatch();
  const rates = useSelector((state) => state.rates);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const [amountFrom, setAmountFrom] = useState(MIN_VALUE);
  const [currencyFrom, setCurrencyFrom] = useState(RUB);
  const [amountTo, setAmountTo] = useState(MIN_VALUE);
  const [currencyTo, setCurrencyTo] = useState(USD);

  /* eslint-disable */
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/${dayjs(date).format('YYYY-MM-DD')}${APP_ID}`)
      .then(({ data }) => {
        const dataRates = data.rates;
        dispatch(addRates(data.rates));
        setAmountTo(
          getFormattedValue(
            (+amountFrom / dataRates[currencyFrom]) * dataRates[currencyTo],
          ),
        );
      })
      .catch(() => {
        setDate((date) => {
          const updatedDate = dayjs(date).subtract(1, 'day');
          setCurrentDate(new Date(updatedDate));
          return updatedDate;
        });
      });
  }, [date, dispatch]);

  const onDateChange = (evt) => {
    setDate(evt);
    setIsVisible(false);
  };

  const onAmountFromChange = (evt) => {
    const value = evt.target.value.replace(/^0+/, '');

    if (value.length < MAX_LENGTH) {
      setAmountFrom(value);
      setAmountTo(
        getFormattedValue((+value / rates[currencyFrom]) * rates[currencyTo]),
      );
    }
  };

  const onCurrencyFromChange = (evt) => {
    const value = evt.target.value;
    setCurrencyFrom(value);
    setAmountTo(
      getFormattedValue((+amountFrom / rates[value]) * rates[currencyTo]),
    );
  };

  const onAmountToChange = (evt) => {
    const value = evt.target.value.replace(/^0+/, '');

    if (value.length < MAX_LENGTH) {
      setAmountTo(value);
      setAmountFrom(
        getFormattedValue((+value * rates[currencyFrom]) / rates[currencyTo]),
      );
    }
  };

  const onCurrencyToChange = (evt) => {
    const value = evt.target.value;
    setCurrencyTo(value);
    setAmountTo(
      getFormattedValue((+amountFrom / rates[currencyFrom]) * rates[value]),
    );
  };

  const onButtonClick = (evt) => {
    evt.preventDefault();
    dispatch(
      addHistory({
        id: id++,
        date: dayjs(date).format('DD.MM.YYYY'),
        amountFrom,
        currencyFrom,
        amountTo,
        currencyTo,
      }),
    );
  };

  return (
    <section className={styles.wrapper} id="converter">
      <div className={styles.inner}>
        <h2 className={styles.title}>Конвертер валют</h2>
        <form className={styles.form}>
          <label className={styles.label}>
            <span className={styles.text}>У меня есть</span>
            <ConverterInput
              amountValue={amountFrom}
              currencyValue={currencyFrom}
              onAmountChange={onAmountFromChange}
              onCurrencyChange={onCurrencyFromChange}
            />
          </label>
          <label className={styles.label}>
            <span className={styles.text}>Хочу приобрести</span>
            <ConverterInput
              amountValue={amountTo}
              currencyValue={currencyTo}
              onAmountChange={onAmountToChange}
              onCurrencyChange={onCurrencyToChange}
            />
          </label>
          {isVisible && (
            <Calendar
              className={styles.calendar}
              onChange={onDateChange}
              value={new Date(date)}
              minDate={dayjs(currentDate).subtract(DIFFERENCE, 'day').toDate()}
              maxDate={currentDate}
            />
          )}
          <input
            className={styles.date}
            onClick={() => {
              setIsVisible(true);
            }}
            type="text"
            value={dayjs(date).format('DD.MM.YYYY')}
            readOnly
          />
          <Button
            className={styles.button}
            onClick={onButtonClick}
            disabled={!+amountFrom || !+amountTo}
          >
            Сохранить результат
          </Button>
        </form>
      </div>
    </section>
  );
}

export { ConverterForm };
