import React from 'react';
import PropTypes from 'prop-types';
import styles from './history-item.module.scss';

function HistoryItem({ date, amountFrom, currencyFrom, amountTo, currencyTo }) {
  return (
    <li className={styles.item}>
      <span className={styles.date}>{date}</span>
      <span className={styles.from}>
        {amountFrom} {currencyFrom}
      </span>
      <span>
        {amountTo} {currencyTo}
      </span>
    </li>
  );
}

HistoryItem.propTypes = {
  date: PropTypes.string.isRequired,
  amountFrom: PropTypes.string.isRequired,
  currencyFrom: PropTypes.string.isRequired,
  amountTo: PropTypes.string.isRequired,
  currencyTo: PropTypes.string.isRequired,
};

export { HistoryItem };
