const mongoose = require('mongoose');

const SneakerSchema = new mongoose.Schema(
    {
        link: {
            type: String,
            trim: true,
            unique: "This image already exists.",
            required: "An image link is required."
        },
        colourway: {
            type: String,
            trim: true,
            unique: "This colourway already exists.",
            required: "A colourway is required."
        },
        model: {
            type: String,
            trim: true,
            unique: "This model already exists.",
            required: "A model is required."
        },
        price: {
            type: Number,
            trim: true,
            required: "A price is required."
        }
        ,
        release: {
            type: Date,
            trim: true,
            default: Date.now,
            required: "A release date is required."
        }
    }
);

module.exports = mongoose.model("Sneaker", SneakerSchema)