const Doctor_schema = require('../../models/Doctor_schema');

module.exports = async (req, res) => {

    let success = false;
    try {
        const { name, email, experience, fees, specialty, userId } = req.body;

        if (!name) {
            return res.status(400).json(
                {
                    success,
                    message: "Name is required"
                }
            )
        }

        const doctors_exists = await Doctor_schema.findOne({ email })
        if (doctors_exists) {
            return res.status(400).json(
                {
                    success,
                    message: "This email is already exists"
                }
            )
        }

        if (!email) {
            return res.status(400).json(
                {
                    success,
                    message: "Email is required"
                }
            )
        }

        if (!experience) {
            return res.status(400).json(
                {
                    success,
                    message: "Experience is required"
                }
            )
        }

        if (!fees) {
            return res.status(400).json(
                {
                    success,
                    message: "Fees is required"
                }
            )
        }

        if (!specialty) {
            return res.status(400).json(
                {
                    success,
                    message: "Specialty is required"
                }
            )
        }

        const doctors = await Doctor_schema.create(
            {
                name,
                email,
                specialty,
                fees,
                experience,
                adminId: userId
            }
        )

        return res.status(200).json(
            {
                success: true,
                message: "Successfully created",
                doctors
            }
        )

    } catch (error) {
        return res.status(400).json(
            {
                success,
                message: error.message
            }
        )
    }
}