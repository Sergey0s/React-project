import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredientsAndPrice = (ingredients, totalPrice) => {
    return {
        type: actionTypes.SET_INGREDIENTS_AND_PRICE,
        ingredients: ingredients,
        totalPrice: totalPrice
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('http://localhost:3003/ingredients')
            .then(response => {
                // console.log(response);
                dispatch(setIngredientsAndPrice(response.data.ingredients, response.data.totalPrice))
            })
            .catch(err => {
                dispatch(fetchIngredientsFailed())
            })
    };
};