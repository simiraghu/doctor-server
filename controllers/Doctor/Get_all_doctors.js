const Doctor_schema = require('../../models/Doctor_schema');

module.exports = async (req, res) => {

    try {

        const { specialty, page, size } = req?.query;

        let query = { status: { $ne: "deleted" } }

        if (specialty) {
            query = {
                status: {
                    $ne: "deleted"
                },
                specialty: {
                    $regex: specialty,
                    $options: "i"
                }
            }
        }

        let doctors;

        if (page && size) {
            const $skip = (page - 1) * size
            doctors = await Doctor_schema.find(query).limit(size).skip($skip);

        } else {
            doctors = await Doctor_schema.find(query)
        }

        const counts = await Doctor_schema.find(query).countDocuments();

        return res.status(200).json(
            {
                success: true,
                message: "successfully found",
                counts,
                doctors
            }
        )

    } catch (error) {
        return res.status(400).json(
            {
                success: false,
                message: error.message
            }
        )
    }
}