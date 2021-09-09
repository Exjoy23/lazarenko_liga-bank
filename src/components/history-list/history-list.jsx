import React from 'react';
import { useSelector } from 'react-redux';
import styles from './history-list.module.scss';
import { HistoryItem } from '../history-item/history-item';

function HistoryList() {
  const history = useSelector((state) => state.history);

  return (
    <ul className={styles.list}>
      {history.map((item) => (
        <HistoryItem key={item.id} {...item} />
      ))}
    </ul>
  );
}

export { HistoryList };
