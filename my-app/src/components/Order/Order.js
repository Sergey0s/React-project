import React from "react";
import classes from './Order.css';
// import {number} from "prop-types";

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({name: ingredientName, amount: props.ingredients[ingredientName]})
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: "inline-block",
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}> {ig.name} ({ig.amount})</span>;
    });

    const ordersData = Object.entries(props.orderData);

    const orderDataOutput = ordersData.map(data => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: "inline-block",
                margin: '0 8px',
                padding: '5px'
            }}
            key={data[0]}> {data[0]}: {data[1]} </span>;
    });

    const orderDate = new Date(props.orderDate).toLocaleString();

    return (<div className={classes.Order} onClick={props.clicked}>
            <p> <span className={classes.order_span}>Ingredients: </span>{ingredientOutput} </p>
            <p> <span className={classes.order_span}>Price: USD</span> {Number.parseFloat(props.price).toFixed(2)} $</p>
            <p> <span className={classes.order_span}>Delivery data:</span> {orderDataOutput}</p>
            <p> <span className={classes.order_span}>Order date:</span> {orderDate} </p>
        </div>
    )
};

export default order;