require("dotenv").config()
const mongoose = require('mongoose') 

const connectDb = async () => {
    const conn = await mongoose.connect(process.env.mongo_uri)
    console.log(`mongodb connected on: ${conn.connections[0].host}`)
}

module.exports = connectDb