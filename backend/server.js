const express = require("express")
require("dotenv").config()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")


const app = express()

// Middle ware
app.use(cors({origin: "http://localhost:5173", credentials: true, optionsSuccessStatus: 200}))
// app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

const port = process.env.PORT || 5000

const userRoutes = require("./routes/userRoutes.js")
app.use("/api/users", userRoutes)


mongoose.connect(process.env.CONNECTION_STRING, {
    // useNewUrlParser: true,
    // useUnifiedTopolgy: true
}).then(() => {
    console.log("MongoDb just joined the fun!")
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
}).catch(error => {
    console.log(`Failed to connect to database: ${error}`)
})

const connetion = mongoose.connection

connetion.once("open", () => {
    console.log("Database reached")
})
