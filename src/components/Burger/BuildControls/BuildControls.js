import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {Label: "Cheese", type: "cheese"},
    {Label: "Salad", type: "salad"},
    {Label: "Bacon", type: "bacon"},
    {Label: "Meat", type: "meat"},
]
const buildControls = (props) => (
    <div className={classes.BuildControls}>
    <p>Current price: <strong>{props.price}$</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.Label} 
            label={ctrl.Label}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
        />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchaseble}
            onClick={props.ordered}
        >{props.isAuth ? "Order" : "Sign In to Order"}</button>
    </div>
);

export default buildControls;