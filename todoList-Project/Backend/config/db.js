const mongoose = require("mongoose")

const connectDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log('Server connected to mongodb', connect.connection.host, connect.connection.name)
    }catch(err){
        console.log(err)
        process.exit(1) //if any error occurs exit from the proccess
    }
}

module.exports = connectDb