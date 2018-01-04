import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacon: 0.7,
    meat: 1.3,
    cheese: 0.4,
}
class BurgerBuilder extends Component {
    constructor(props){
        super(props);
        this.state = {
            ingredients: null,
            totalPrice: 4,
            purchaseble: false,
            purchasing: false,
            loading: false,
            error: false,
        }
    }
    componentDidMount() {
        axios.get('https://react-burger-app-7c482.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
        })
        .catch(error => {
            this.setState({error: error}); 
        });
    }
    purchaseHandler = () => {
        this.setState({purchasing: true})
    }
    cancelPurchaseHandler = () => {
        this.setState({purchasing: false})
    }
    continuePurchaseHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Chris Kuczma',
                adress: {
                    street: 'Somestreet 1',
                    zipCode: '78-150',
                    country: 'Poland'
                },
                email: 'wrong@turn.com',
            },
            deliveryMethod: 'fastest'
        }
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        })
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
        let orderSummary = null;
        let burger = this.state.error ? <p>{this.state.error.message}</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
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
            orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCanceled={this.cancelPurchaseHandler}
            purchaseContinued={this.continuePurchaseHandler}
            price={this.state.totalPrice.toFixed(2)}
            />
            if (this.state.loading) {
                orderSummary = <Spinner />;
            }
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}    
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);