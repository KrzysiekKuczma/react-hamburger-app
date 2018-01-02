import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacon: 0.7,
    meat: 1.3,
    cheese: 0.4,
}
class BurgerBuilder extends Component {
    constructor(props){
        super(props);
        this.state ={
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchaseble: false,
            purchasing: false,
        }
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }
    cancelPurchaseHandler = () => {
        this.setState({purchasing: false})
    }
    continuePurchaseHandler = () => {
        alert('Purchased')
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        this.setState({purchaseble: sum > 0});
    }
    moreIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};

        updatedIngredients[type] = updateCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }
    lessIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <=0 ){
            return;
        }
        const updateCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };

        updatedIngredients[type] = updateCount;
        const priceDeduction = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredients);
    }
    render(){ 
        const disabledItem = {
            ...this.state.ingredients
        }
        for (let key in disabledItem) {
            disabledItem[key] = disabledItem[key] <= 0;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.cancelPurchaseHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        purchaseCanceled={this.cancelPurchaseHandler}
                        purchaseContinued={this.continuePurchaseHandler}
                        price={this.state.totalPrice.toFixed(2)}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.moreIngredientHandler}
                    ingredientRemoved={this.lessIngredientHandler}
                    disabled={disabledItem}
                    purchaseble={this.state.purchaseble}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice.toFixed(2)}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;