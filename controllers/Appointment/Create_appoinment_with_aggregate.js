const moment = require('moment');
const AppointmentSchema = require('../../models/AppointmentSchema');
const mongoose = require('mongoose');

module.exports = async (req, res) => {

    let success = false;

    try {

        const {
            patientname,
            dob,
            datetime,
            gender,
            phonenumber,
            doctorId,
            doctorname,
            specialty,
            email,
            userId

        } = req?.body;

        if (!patientname) {
            return res.status(400).json(
                {
                    success,
                    message: "Patient name required"
                }
            )
        }

        if (!dob) {
            return res.status(400).json(
                {
                    success,
                    message: "Date of birth required"
                }
            )
        }

        if (!gender) {
            return res.status(400).json(
                {
                    success,
                    message: "Gender required"
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

        if (!datetime) {
            return res.status(400).json(
                {
                    success,
                    message: "Date and time required"
                }
            )
        }


        if (!specialty) {
            return res.status(400).json(
                {
                    success,
                    message: "Specialty required"
                }
            )
        }

        if (!doctorname || !doctorId) {
            return res.status(400).json(
                {
                    success,
                    message: "Doctor name required"
                }
            )
        }

        const endTime = moment(datetime).add(30, 'minutes').toISOString()
        const appointmentStartTIme = moment(datetime).set(
            {
                hours: 10,
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            }
        ).toISOString()

        const appointmentEndTime = moment(datetime).set(
            {
                hours: 20,
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            }
        ).toISOString()

        if (datetime < appointmentStartTIme || datetime > appointmentEndTime) {
            return res.status(400).json(
                {
                    success,
                    message: "Center closed at that time"
                }
            )
        }


        const findAppointment = await AppointmentSchema.aggregate(
            [
                {
                    $match: {
                        doctorId: new mongoose.Types.ObjectId(doctorId),
                        $or: [
                            { datetime: { $lte: endTime, $gte: datetime } },
                            { endtime: { $gte: datetime, $lte: endTime } },
                            { $and: [{ datetime: { $lte: datetime } }, { endtime: { $gte: endTime } }] }
                        ]
                    }
                }
            ]
        )

        if (findAppointment.length > 0) {
            return res.status(400).json(
                {
                    success,
                    message: "This time is already book "
                }
            )
        }

        const appointment = await AppointmentSchema.create(
            {
                patientname,
                dob,
                gender,
                phonenumber,
                email,
                datetime,
                endtime: endTime,
                doctorId,
                doctorname,
                userId,
                specialty
            }
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully created",
                appointment
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