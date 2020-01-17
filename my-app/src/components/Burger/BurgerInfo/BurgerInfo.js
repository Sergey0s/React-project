import React from "react";
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './BurgerInfo.css';


const burgerInfo = (props) => {
    let ingredients = '';
    for (let keys in props.burgersDB.ingredients) {
        let newIngredient = keys + ':  ' +  props.burgersDB.ingredients[keys] + '\n';
        ingredients += newIngredient;
    };

    return (
        <Aux>
            <p className={classes.infoName}> {props.burgersDB.name} </p>
            <p className={classes.infoPrice}> Price: {props.burgersDB.totalPrice} $</p>
            <p className={classes.infoIngredients}> Ingredients: {ingredients} </p>
        </Aux>
    );
};

export default burgerInfo;