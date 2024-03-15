require("dotenv").config()

const express = require("express")
const app = express() 
const connectDb = require('./database/db')

app.use(express.json()) 
app.use(express.urlencoded({extended:false}))

//database 
connectDb()

const UserRoute = require('./routes/Auth')
app.use("/api/v1", UserRoute)

const port = process.env.port || 5000 
app.listen(port, () => {
    console.log(`port started on localhost:${port}`)
})