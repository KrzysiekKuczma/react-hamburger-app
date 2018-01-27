import React from 'react';
import styles from './Spinner.css';

const spinner = () => (
    <div className={styles.Spinner}>
        <div className={styles.Dot1}></div>
        <div className={styles.Dot2}></div>
    </div>
);

export default spinner;