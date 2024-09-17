const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const User_schema = new Schema(
    {
        username: {
            required: true,
            type: String
        },

        email: {
            required: true,
            type: String,
            unique: true
        },

        phonenumber: {
            required: true,
            type: Number
        },

        city: {
            required: true,
            type: String
        },

        country: {
            required: true,
            type: String
        },

        password: {
            required: true,
            type: String
        },

        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"]
        }

    }, { timestamps: true }
)

module.exports = mongoose.model('user', User_schema)