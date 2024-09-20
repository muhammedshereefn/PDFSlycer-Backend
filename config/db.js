const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MONGODB CONNECTED");
        
    } catch (error) {
        console.error("Error connecting MongoDb", error);
        process.exit(1)
        
    }
}

module.exports = connectDB;