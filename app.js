const express = require('express')
const bodyparser = require("body-parser")
const cors = require("cors")

const route = require("./Routes/houseRoute")

const app = express()
const port = 3000


//Middlewares
app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(route)

//Server Started
app.listen(port, () => {
    console.log("Server Started")
})