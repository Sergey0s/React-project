import {updateObject} from "../../shared/utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {};


const setBurgers = (state, action) => {
    return updateObject(state, {
        burgerDB: action.burgerDB
    })
};

const fetchBurgersFailed = (state, action) => {
    return updateObject(state, {error: true});
};

const mainPageBurgers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_MAIN_BURGERS:
            return setBurgers(state, action);
        case actionTypes.FETCH_MAIN_BURGERS:
            return fetchBurgersFailed(state, action);
        default:
            return state;
    }
};

export default mainPageBurgers;