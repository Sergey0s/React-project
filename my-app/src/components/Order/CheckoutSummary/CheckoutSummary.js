import React from "react";
import Burger from '../../../components/Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1 style={{textShadow: '0 1px 1px #985425'}}> You're just one step away from your BURGER !</h1>
            <div style={{width:'100%', margin: 0}}>
                <Burger ingredients ={props.ingredients}/>
            </div>
            <Button
                btnType='Danger'
                clicked={props.checkoutCancelled}

            > CANCEL </Button>
            <Button
                btnType='Success'
                clicked={props.checkoutContinued}
            > CONTINUE </Button>
        </div>
    )
};

export default checkoutSummary;