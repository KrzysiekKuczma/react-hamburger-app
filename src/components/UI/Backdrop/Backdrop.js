import React from 'react';
import classes from './Backdrop.css';

const backdrop = (props) => {
    console.log(props)
    if (props.show){
        return <div 
            className={classes.Backdrop}
            onClick={props.clicked}
        ></div> 
    } else{
        return null
    }
};

export default backdrop;