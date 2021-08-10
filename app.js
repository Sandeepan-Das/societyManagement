const express = require('express')
const bodyparser = require("body-parser")
const cors = require("cors")

const houseRoute = require("./Routes/houseRoute")
const credentialRoute = require("./Routes/credentialRoute")
const errorHandler = require("./error/apiError")

const app = express()
const port = 3000


//Middlewares
app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }))


app.use(houseRoute)
app.use(credentialRoute)
app.use(errorHandler)
//Server Started
app.listen(port, () => {
    console.log("Server Started")
})