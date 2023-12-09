import React from 'react';
import { useState } from 'react';
import products from './api-products.js'
import { makeStyles } from '@material-ui/core';
import './FeaturedItems.css'

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 400,
        margin: "0 auto",
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
        textAlign: "center",
    },
    textField: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    error: {
        color: "red",
    },
    submit: {
        margin: "0 auto",
        marginBottom: theme.spacing(2),
    },
    title: {
        fontSize: 18,
    },
}));

const FeaturedItems = () => {
    const classes = useStyles();
    const [sneakers, setSneakers] = useState([])

    const abortController = new AbortController()
    const signal = abortController.signal;
    products.list(signal).then((data) => {
        setSneakers(data);
    })



    return (
        <div id="featured-items">
            {sneakers.map((item, index) => (
                <div key={index} id="item">
                    <img src={item.link} />
                    <div id="details">
                        <p>Brand: {item.model}</p>
                        <p>Colourway: {item.colourway}</p>
                        <p>Price: ${item.price.toFixed(2)}</p>
                        {/* <p>{item._id}</p> */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeaturedItems;