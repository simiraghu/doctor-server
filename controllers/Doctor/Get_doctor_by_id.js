const DoctorSchema = require('../../models/Doctor_schema')

module.exports = async (req, res) => {

    try {
        const { id } = req?.query;
        const doctor = await DoctorSchema.findOne(
            {
                _id : id,
                status: {
                    $ne: "deleted"
                }
            }
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully found",
                doctor
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