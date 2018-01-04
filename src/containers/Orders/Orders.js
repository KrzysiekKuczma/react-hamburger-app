import React, { Component } from 'react';
import Order from "../../components/Order/Order/Order";
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
// import classes from './Orders.css';

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }
    componentDidMount() {
        axios.get('orders.json')
            .then(response  => {
                const fetchedOrders =[];

                for (let key in response.data) {
                    fetchedOrders.push({
                            ...response.data[key],
                            id: key
                        });
                }
                this.setState({ loading: false, orders: fetchedOrders })
            })
            .catch(error  => {
                this.setState({loading: false, })
            });
    }
    render() {
        let orders = <Spinner />
        if (this.state.orders.length > 0) {
            orders = this.state.orders.map(order => (
                <Order key={order.id}
                       ingredients={order.ingredients}
                       price={order.price}
                />
            ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);