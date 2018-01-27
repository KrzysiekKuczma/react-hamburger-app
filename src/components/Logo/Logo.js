import React from 'react';
import styles from './Logo.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => (
    <div className={styles.Logo}>
        <img src={burgerLogo} alt="Logo" />
    </div>
);

export default logo;