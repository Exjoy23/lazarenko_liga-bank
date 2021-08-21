import React from 'react';
import PropTypes from 'prop-types';
import styles from './range.module.scss';

function Range({
  value,
  min = 10,
  max = 100,
  step = 5,
  onChange,
  markFrom = '',
  markTo = '',
}) {
  const onInputChange = (evt) => {
    onChange(evt.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onInputChange}
      />
      <div className={styles.inner}>
        <span>{markFrom}</span>
        <span>{markTo}</span>
      </div>
    </div>
  );
}

Range.propTypes = {
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  markFrom: PropTypes.string,
  markTo: PropTypes.string,
};

export { Range };
