const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const AppointmentSchema = new Schema(
    {
        status: {
            type: String,
            default: "saved"
        },

        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },

        doctorId: {
            type: mongoose.Types.ObjectId,
            ref: 'doctor'
        },

        patientname: {
            required: true,
            type: String
        },

        dob: {
            required: true,
            type: String
        },

        gender: {
            required: true,
            type: String
        },

        phonenumber: {
            required: true,
            type: Number
        },

        email: {
            type: String
        },

        datetime: {
            required: true,
            type: String
        },

        endtime: {
            required: true,
            type: String
        },

        doctorname: {
            required: true,
            type: String
        },

        specialty: {
            required: true,
            type: String
        },

    },{ timestamps: true}
)

module.exports = mongoose.model('appointment', AppointmentSchema)