import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './select.module.scss';
import classNames from 'classnames';

const CreditType = {
  DEFAULT: 'Выберите цель кредита',
  MORTGAGE: 'Ипотечное кредитование',
  CAR: 'Автомобильное кредитование',
};

function Select({ activeType, onActiveType }) {
  const [isOpen, setIsOpen] = useState(false);

  const onListChange = (evt) => {
    onActiveType(evt.target.value);
    setIsOpen(false);
  };

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
        <ul className={styles.list} onChange={onListChange}>
          <li className={styles.item} tabIndex="0">
            <input
              className={classNames('visually-hidden', styles.input)}
              id="mortgage"
              type="radio"
              name="credit"
              value="MORTGAGE"
            />
            <label className={styles.label} htmlFor="mortgage">
              {CreditType.MORTGAGE}
            </label>
          </li>
          <li className={styles.item} tabIndex="0">
            <input
              className={classNames('visually-hidden', styles.input)}
              id="car"
              type="radio"
              name="credit"
              value="CAR"
            />
            <label className={styles.label} htmlFor="car">
              {CreditType.CAR}
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
