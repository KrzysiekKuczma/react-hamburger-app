import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    constructor(props){
        super(props);
        this.state = {
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

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }

        queryParams.push('price=' + this.props.price);
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
        return sum > 0;
    }
    render(){ 
        const disabledItem = {
            ...this.props.ings
        }
        for (let key in disabledItem) {
            disabledItem[key] = disabledItem[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>{this.state.error.message}</p> : <Spinner />
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledItem}
                        purchaseble={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price.toFixed(2)}
                        />
                </Aux>
            );
            orderSummary = <OrderSummary
            ingredients={this.props.ings}
            purchaseCanceled={this.cancelPurchaseHandler}
            purchaseContinued={this.continuePurchaseHandler}
            price={this.props.price.toFixed(2)}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));