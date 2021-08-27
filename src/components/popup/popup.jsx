import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import styles from './popup.module.scss';

function Popup({ isOpen, onClose }) {
  return (
    <ReactModal
      className={styles.modal}
      isOpen={isOpen}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      onRequestClose={() => onClose(false)}
      style={{
        overlay: { backgroundColor: 'rgba(88, 87, 87, 0.6)', zIndex: '10000' },
      }}
      ariaHideApp={false}
    >
      <h2 className={styles.title}>Спасибо за обращение в наш банк.</h2>
      <p className={styles.text}>
        Наш менеджер скоро свяжется с вами по указанному номеру телефона.
      </p>
      <button className={styles.button} onClick={onClose} type="button" />
    </ReactModal>
  );
}

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export { Popup };
