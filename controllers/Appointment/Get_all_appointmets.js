const AppointmentSchema = require('../../models/AppointmentSchema');

module.exports = async (req, res) => {
    try {

        const { page, size } = req?.query;

        let query = {
            status: {
                $ne: "deleted"
            }
        }

        let all_appointments;
        let count;

        if (page && size) {
            const $skip = (page - 1) * size

            all_appointments = await AppointmentSchema.find(query).limit(size).skip($skip);
            count = await AppointmentSchema.find(query).countDocuments();

        } else {
            all_appointments = await AppointmentSchema.find(query);
            count = await AppointmentSchema.find(query).countDocuments();

        }

        return res.status(200).json(
            {
                success: true,
                message: "successfully found",
                count,
                all_appointments
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