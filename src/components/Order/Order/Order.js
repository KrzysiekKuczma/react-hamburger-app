import React from 'react';
import styles from './Order.css';

const order = (props) => {
    const ingredients = [];
    
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }
    const ingredientsOutput = ingredients.map(ingredient => {
        return <span key={ingredient.name} className={styles.Ingredient} >{ingredient.name} ({ingredient.amount})</span>
    });

    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}$</strong></p>
        </div>
    );
};

export default order;

