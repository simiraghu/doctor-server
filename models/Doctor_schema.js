const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const DoctorSchema = new Schema(
    {
        status: {
            type: String,
            default: "saved"
        },

        name: {
            required: true,
            type: String
        },

        email: {
            required: true,
            type: String
        },

        specialty: {
            required: true,
            type: String
        },

        experience: {
            required: true,
            type: Number
        },

        fees: {
            required: true,
            type: Number
        },

        image: {
            type: String
        }

    }, { timestamps: true }
)

module.exports = mongoose.model('doctor', DoctorSchema)