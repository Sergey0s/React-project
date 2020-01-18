import React, {Component} from "react";
import {connect} from "react-redux";
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    deleteOrderHandler = (orderId) => {
        axios.post('http://localhost:3003/orders/delete?access_token='+ this.props.token, {orderId})
            .then(res=> {
                this.props.onFetchOrders(this.props.token, this.props.userId)})
            .catch(err=> err.response.data)
    };

    render() {

        let orders = <Spinner/>;
        if (!this.props.loading) {
            if (!this.props.error) {
                if (this.props.orders.length === 0) {
                    orders = <p style={{margin: '80px'}}> No orders created yet. Make your first one ;) <br/> <a href='/'> Back to main page </a> </p>
                } else {
                    orders = (
                        <div style={{marginTop: '80px'}}> {
                            this.props.orders.map((order) => {
                                return <Order
                                    ingredients={order.ingredients}
                                    price={order.totalPrice}
                                    orderData={order.orderData}
                                    orderDate={order.createdAt}
                                    key={order._id}
                                    clicked={()=>this.deleteOrderHandler(order._id)}
                                />
                            })
                        }
                        </div>
                    )
                }
            } else {
                orders = <p style={{margin: '80px'}}> {this.props.error} </p>
            }
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        error: state.auth.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));