import React from 'react';
import styles from './Backdrop.css';

const backdrop = (props) => {
    if (props.show){
        return <div 
            className={styles.Backdrop}
            onClick={props.clicked}
        ></div> 
    } else{
        return null
    }
};

export default backdrop;