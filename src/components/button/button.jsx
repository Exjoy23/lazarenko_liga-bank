import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.scss';
import classNames from 'classnames';

function Button({ children, className, secondary, style, ...attrs }) {
  const Tag = attrs.href ? 'a' : 'button';

  return (
    <Tag
      className={classNames(
        className,
        styles.button,
        secondary && styles.button_secondary,
      )}
      style={style}
    >
      {children}
    </Tag>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  secondary: PropTypes.bool,
  style: PropTypes.object,
};

export { Button };
