const User_schema = require('../../models/User_schema');
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

module.exports = async (req, res) => {

    try {

        const { email, password } = req?.body;

        const user = await User_schema.findOne(
            {
                email,
                status: {
                    $ne: "deleted"
                }
            }
        )
        if (!user) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Invalid email or password"
                }
            )
        }

        const isPassword = await bcrypt.compare(password, user?.password)
        if (!isPassword) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Invalid email or password"
                }
            )
        }


        const token = await JWT.sign(
            {
                userId: user?._id,
                email: user?.email,
                role: user?.role
            }, process.env.JWT_SECRET_KEY)

        return res.status(200).json(
            {
                success: true,
                message: "Login successfully",
                token
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