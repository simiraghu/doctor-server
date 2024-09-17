const AppointmentSchema = require('../../models/AppointmentSchema');

module.exports = async (req, res) => {

    try {
        const { id } = req?.query;

        const appointments = await AppointmentSchema.findByIdAndUpdate(
            {
                _id: id
            },
            {
                status: "deleted"
            },
            { new: true }
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully deleted",
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