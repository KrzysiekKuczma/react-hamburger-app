import React, { Component } from 'react';
import Aux from  '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class orderSummary extends Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}>
                    <span style={{textTransform: "uppercase"}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            });
        return (
            <Aux>
                <h3>Your order is</h3>
                <p>A delicious burger with:</p>
                <ul>
                    {ingredientSummary}
                    <strong>Yoru price is: {this.props.price}$</strong>
                </ul>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
};

export default orderSummary;