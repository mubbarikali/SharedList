const mongoose = require('mongoose');

const connectDB = async ()=>{   
    try {
        const conn = await mongoose.connect(process.env.DB_CONNECTION_URL)
        console.log("Connected to DB.");    
    } catch (error) {
        console.error("Error connecting to DB:", err);
    }
};

module.exports = connectDB;