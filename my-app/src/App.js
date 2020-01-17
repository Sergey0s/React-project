import React from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import MainPage from "./components/MainPage/MainPage";
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
import ContactData from "./containers/Checkout/ContactData/ContactData";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});

class App extends React.Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
            <Switch>
                <Route path='/auth' component={asyncAuth}/>
                <Route path='/burgerBuilder' component={BurgerBuilder}/>
                <Route path='/' component={MainPage}/>
                <Redirect to='/'/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/checkout/contact-data' component={ContactData}/>
                    <Route path='/checkout' component={asyncCheckout}/>
                    <Route path='/orders' component={asyncOrders}/>
                    <Route path='/logout' component={Logout}/>
                    <Route path='/auth' component={asyncAuth}/>
                    <Route path='/burgerBuilder' component={BurgerBuilder}/>
                    <Route path='/' component={MainPage}/>
                    <Redirect to='/'/>
                </Switch>
            );
        }

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
