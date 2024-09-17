const User_schema = require('../../models/User_schema');
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

module.exports = async (req, res) => {

    let success = false;

    try {
        const { username, email, password, phonenumber, city, country } = req?.body;

        if (!username) {
            return res.status(400).json(
                {
                    success,
                    message: "User name required"
                }
            )
        }
        const user_exists = await User_schema.findOne({ email })

        if (user_exists) {
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
                    message: "Email  required"
                }
            )
        }

        if (!phonenumber) {
            return res.status(400).json(
                {
                    success,
                    message: "Phone number required"
                }
            )
        }

        const HashPassword = await bcrypt.hash(password, 10)
        if (!password) {
            return res.status(400).json(
                {
                    success,
                    message: "Password required"
                }
            )
        }

        if (!city) {
            return res.status(400).json(
                {
                    success,
                    message: "City required"
                }
            )
        }

        if (!country) {
            return res.status(400).json(
                {
                    success,
                    message: "Country required"
                }
            )
        }

        const user = await User_schema.create(
            {
                username,
                email,
                password: HashPassword,
                city,
                phonenumber,
                country
            }
        )

        const getUser = await User_schema.findOne({ email })

        const token = await JWT.sign(
            {
                userId: getUser?._id,
                email: getUser?.email,
                role: getUser?.role
            }, process.env.JWT_SECRET_KEY)

        return res.status(200).json(
            {
                success: true,
                message: "successfully created user",
                user,
                token
            }
        )

    } catch (error) {
        return res.status(400).json(
            {
                success,
                message: error?.message
            }
        )
    }
}