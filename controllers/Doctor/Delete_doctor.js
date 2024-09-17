const Doctor_schema = require('../../models/Doctor_schema');

module.exports = async (req, res) => {

    try {
        const { id } = req?.query;

        const doctor = await Doctor_schema.findByIdAndUpdate(
            { _id: id },
            { status: "deleted" },
            { new: true }
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully deleted",
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