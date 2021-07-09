const express = require('express')
const bodyparser = require("body-parser")
const cors = require("cors")

const route = require("./Routes/route")

const app = express()
const port = 3000


//Middlewares
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(cors())
app.use(route)

//Server Started
app.listen(port, () => {
    console.log("Server Started")
})