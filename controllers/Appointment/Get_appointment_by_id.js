const AppointmentSchema = require('../../models/AppointmentSchema')
const mongoose = require('mongoose');

module.exports = async (req, res) => {

    try {
        const { id } = req?.query;

        const appointments = await AppointmentSchema.findOne(
            {
                _id: new mongoose.Types.ObjectId(id),
                status: {
                    $ne: "deleted"
                }
            }
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully found",
                appointments
            }
        )

    } catch (error) {
        return res.status(400).json(
            {
                success: false,
                message: error?.message
            }
        )
    }
}