import React from 'react';
import PropTypes from 'prop-types';
import styles from './checkbox.module.scss';

function Checkbox({ children, onChange, value }) {
  return (
    <label className={styles.wrapper}>
      <input
        onChange={(evt) => onChange(evt.target.checked)}
        className={styles.input}
        type="checkbox"
        checked={value}
      />
      <span className={styles.text}>{children}</span>
    </label>
  );
}

Checkbox.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};

export { Checkbox };
