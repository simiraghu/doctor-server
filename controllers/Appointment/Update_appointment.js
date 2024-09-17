const AppointmentSchema = require('../../models/AppointmentSchema')
const moment = require('moment');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
    try {

        const { id } = req?.query;
        let success = false;

        const update_data = req?.body;

        const get_appointment_by_id = await AppointmentSchema.findOne(
            {
                _id: new mongoose.Types.ObjectId(id),
                status: { $ne: "deleted" }
            }
        )

        const datetime = update_data?.datetime
        const doctorId = update_data?.doctorId

        if (datetime !== get_appointment_by_id?.datetime) {

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
                                {
                                    $and: [
                                        { datetime: { $lte: datetime } },
                                        { endtime: { $gte: endTime } }
                                    ]
                                }
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
        }

        const appointments = await AppointmentSchema.findByIdAndUpdate(
            {
                _id: id,
                status: {
                    $ne: "deleted"
                }
            },
            req?.body,
            { new: true }
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully updated",
                appointments
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