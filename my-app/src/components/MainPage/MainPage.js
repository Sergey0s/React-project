import React, {Component} from "react";
import axios from '../../axios-orders';
import {connect} from 'react-redux';

import classes from './MainPage.css';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BurgerInfo from "../Burger/BurgerInfo/BurgerInfo";
import * as actions from "../../store/actions";
// import Modal from '../../components/UI/Modal/Modal';
// import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
// import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../UI/Spinner/Spinner";

// import * as actions from '../../store/actions/index';

class MainPage extends Component {

    componentDidMount() {
        this.props.onInitBurgers();
    }

    purchaseContinueHandler = (key) => {
        if (this.props.isAuthenticated) {
            this.props.onSetIngredientsAndPrice(this.props.burgersDB[key].ingredients, this.props.burgersDB[key].totalPrice);
            this.props.onInitPurchase();
            this.props.history.push('/checkout')
        } else {
            this.props.history.push('/auth')
        }
    };

    render() {
        let createBurger = (
            <div className={classes.createBurgerDiv}>
            <button onClick={()=>this.props.history.push('/burgerBuilder')} className={classes.createBurgerButton}> CREATE your own BURGER </button>
        <p> or choose now </p>
            </div>
        );


        let burgersArr = [];
        let burger = !this.props.burgersDB ? <p>Ingredients can't be loaded</p> : <Spinner/>;

        if (this.props.burgersDB) {

            console.log(this.props.burgersDB);
            this.props.burgersDB.map((burgerFromDB, index) => {

                if (burgerFromDB.name === 'base') {
                    burger = null;
                } else {
                    burger = (
                            <div key={burgerFromDB.name} className={classes.burgerItem}>
                                <Burger class={"preview"} ingredients={burgerFromDB.ingredients}/>
                                {/*    // ordered={this.purchaseHandler}*/}
                                {/*    // isAuth={this.props.isAuthenticated}*/}
                                {/*    // price={this.props.price}*/}
                                <BurgerInfo burgersDB={burgerFromDB}/>


                                <button
                                    className={classes.orderButton}
                                    onClick={()=>this.purchaseContinueHandler(index)}
                                >{ this.props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
                            </div>
                    )
                }
                burgersArr.push(burger);
            })
        }

        return (
            <Aux>
                {createBurger}
                <div className={classes.burgersList}>
                {burgersArr}
                </div>
            </Aux>)
    }
}

const mapStateToProps = state => {
    return {
        burgersDB: state.mainPage.burgerDB,
        // error: state.mainPage.error,
        isAuthenticated: state.auth.token != null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitBurgers: () => dispatch(actions.initBurgers()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetIngredientsAndPrice: (ingredients, totalPrice) =>dispatch(actions.setIngredientsAndPrice(ingredients, totalPrice))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(MainPage, axios));
