const AppointmentSchema = require('../../models/AppointmentSchema');
const mongoose = require('mongoose');

module.exports = async (req, res) => {

    try {
        const { userId } = req?.body;

        const appointments = await AppointmentSchema.find(
            {
                userId: new mongoose.Types.ObjectId(userId),
                status: {
                    $ne: "deleted"
                }
            }
        )

        return res.status(200).json(
            {
                success: true,
                message: "Successfully found appointments by userId",
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