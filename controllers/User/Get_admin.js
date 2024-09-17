const JWT = require('jsonwebtoken');
const User_schema = require('../../models/User_schema');

module.exports = async (req, res) => {

    try {

        const token = req?.header('token');
        if (!token) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Invalid authentication"
                }
            )
        }
        
        const auth_token = await JWT.verify(token, process.env.JWT_SECRET_KEY)
        if (!auth_token) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Invalid authentication"
                }
            )
        }

        const role = auth_token?.role

        const user = await User_schema.findOne(
            {
                _id: auth_token?.userId,
                status: {
                    $ne: "deleted"
                }
            }
        )

        if (!user) {
            return res.status(400).json(
                {
                    success: false,
                    message: "verification failed"
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: "auth veryfication",
                role
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