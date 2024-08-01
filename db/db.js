const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGODB_CONNECTION_STRING

mongoose.connect(MONGO_URI).then(()=>{
    console.log('connected to mongoDB successfully')
}).catch((err)=>{
    console.log(err)
})