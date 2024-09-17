const AppointmentSchema = require('../../models/AppointmentSchema');
const moment = require('moment');
const mongoose = require('mongoose');

module.exports = async (req, res) => {

    let success = false;
    try {

        const {
            patientname,
            dob,
            gender,
            phonenumber,
            datetime,
            doctorId,
            specialty,
            doctorname,
            email,
            endtime,
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
                    message: "Date time required "
                }
            )
        }

        if (!doctorId) {
            return res.status(400).json(
                {
                    success,
                    message: "Select doctor"
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


        const endTime = moment(datetime).add(30, 'minutes').toISOString();

        const appointmentStartTime = moment(datetime).set(
            {
                hour: 10,
                minute: 0,
                second: 0,
                millisecond: 0
            }
        ).toISOString();

        const appointmentEndTime = moment(datetime).set(
            {
                hour: 20,
                minute: 0,
                second: 0,
                millisecond: 0
            }
        ).toISOString();

        const doctors = await AppointmentSchema.find(req?.doctorId);
        // const doctors = await AppointmentSchema.aggregate(
        //     [
        //         {
        //             $match: {
        //                 doctorId: new mongoose.Types.ObjectId(doctorId),
        //                 datetime: 
        //             }
        //         }
        //     ]
        // )

        console.log(doctors)



        for (const doctor of doctors) {

            const dbDateTime = doctor?.datetime;
            const dbEndTime = doctor?.endtime;

            if (appointmentStartTime > datetime || datetime > appointmentEndTime) {
                return res.status(400).json(
                    {
                        success,
                        message: "Center closed at that time"
                    }
                )
            }

            if (datetime === dbDateTime || datetime === dbEndTime) {
                return res.status(400).json(
                    {
                        success,
                        message: "This time is already book"
                    }
                )
            }

            if (datetime < dbDateTime && dbDateTime < endTime && endTime < dbEndTime) {
                return res.status(400).json(
                    {
                        success,
                        message: "This time is already book"
                    }
                )
            }

            if (datetime < dbEndTime && datetime > dbDateTime) {
                return res.status(400).json(
                    {
                        success,
                        message: "This time is already book"
                    }
                )
            }
        }

        const appointment = await AppointmentSchema.create(
            {
                patientname,
                doctorId,
                userId,
                dob,
                gender,
                phonenumber,
                email,
                datetime,
                endtime: endTime,
                specialty,
                doctorname
            }
        );


        return res.status(200).json(
            {
                success: true,
                message: "Appointment successfull please consult doctor at your time",
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