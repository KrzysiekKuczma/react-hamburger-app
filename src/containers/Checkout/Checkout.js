import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
    }

    componentWillMount() {
        this.props.onInitPurchase();
    }
    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to="/"/>;
        console.log(this.props)
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route path={this.props.match.path + '/contact-data'} 
                        component={ContactData}
                        />
                    {purchasedRedirect}
                </div>
            );
        }
        return summary;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actionTypes.purchaseInit()),
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout); 