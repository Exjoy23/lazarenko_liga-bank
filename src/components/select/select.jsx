import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './select.module.scss';
import classNames from 'classnames';

const CreditType = {
  default: 'Выберите цель кредита',
  mortgage: 'Ипотечное кредитование',
  car: 'Автомобильное кредитование',
};

function Select({ activeType, onActiveType }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button
        className={classNames(styles.button, isOpen && styles.button_active)}
        onClick={() => setIsOpen((state) => !state)}
        type="button"
      >
        {CreditType[activeType]}
      </button>
      {isOpen && (
        <ul
          className={styles.list}
          onChange={(evt) => {
            onActiveType(evt.target.value);
            setIsOpen(false);
          }}
        >
          <li className={styles.item}>
            <input
              className={classNames('visually-hidden', styles.input)}
              id="mortgage"
              type="radio"
              name="credit"
              value="mortgage"
              disabled={CreditType[activeType] === CreditType.mortgage}
            />
            <label className={styles.label} htmlFor="mortgage">
              {CreditType.mortgage}
            </label>
          </li>
          <li className={styles.item}>
            <input
              className={classNames('visually-hidden', styles.input)}
              id="car"
              type="radio"
              name="credit"
              value="car"
              disabled={CreditType[activeType] === CreditType.car}
            />
            <label className={styles.label} htmlFor="car">
              {CreditType.car}
            </label>
          </li>
        </ul>
      )}
    </div>
  );
}

Select.propTypes = {
  activeType: PropTypes.string.isRequired,
  onActiveType: PropTypes.func.isRequired,
};

export { Select };
