import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const setBurgers = (burgerDB) => {
    return {
        type: actionTypes.SET_MAIN_BURGERS,
        burgerDB: burgerDB,
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_MAIN_BURGERS
    }
};

export const initBurgers = () => {
    return dispatch => {
        axios.get('http://localhost:3003/burgers')
            .then(response => {
                dispatch(setBurgers(response.data))
            })
            .catch(err => {
                dispatch(fetchIngredientsFailed())
            })
    };
};