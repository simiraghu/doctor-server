const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {

    try {
        const token = req?.header('token')
        if (!token) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Invalid authentication please login first"
                }
            )
        }

        const auth_token = await JWT.verify(token, process.env.JWT_SECRET_KEY)
        if (!auth_token) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Invalid authentication please login first"
                }
            )
        }

        req.body.userId = auth_token?.userId
        next()
        
    } catch (error) {
        return res.status(400).json(
            {
                success: false,
                message: error?.message
            }
        )
    }

}