import React from 'react';
import Aux from  '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';


const OrderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
            .map(igKey => {
                return <li key={igKey}>
                    <span style={{textTransform: "uppercase"}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            });
        return (
            <Aux>
                <h3>Your order is</h3>
                <p>A delicious burger with:</p>
                <ul>
                    {ingredientSummary}
                    <strong>Yoru price is: {props.price}$</strong>
                </ul>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
}
export default OrderSummary;