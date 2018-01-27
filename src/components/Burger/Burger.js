import React from 'react';
import styles from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        })
        .reduce((arr, el) => arr.concat(el), []);
    if (transformIngredients.length === 0 ) {
        transformIngredients = <p>Start to add some ingredients</p>
    }
    return <div className={styles.Burger}>
        <BurgerIngredient type="bread-top"/>
        {transformIngredients}
        <BurgerIngredient type="bread-bottom"/>
    </div>
}

export default burger;