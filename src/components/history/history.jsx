import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './history.module.scss';
import { HistoryList } from '../history-list/history-list';
import { clearHistory } from '../../store/actions';
import { Button } from '../button/button';

function History() {
  const history = useSelector((data) => data.history);
  const dispatch = useDispatch();

  const onButtonClick = () => {
    dispatch(clearHistory());
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.inner}>
        <h2 className={styles.title}>История конвертаций</h2>
        <HistoryList />
        <Button onClick={onButtonClick} fullwidth disabled={!history.length}>
          Очистить историю
        </Button>
      </div>
    </section>
  );
}

export { History };
