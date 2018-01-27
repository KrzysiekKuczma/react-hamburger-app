import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.css';


const checkoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>Enjoy this meal!</h1>
            <div style={{ width: '100%', height: '400px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;
