const express = require('express')
const bodyparser = require("body-parser")
const cors = require("cors")

const app = express()
const port = 3000


app.use(express.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(cors())


app.listen(port, () => {
    console.log("Server Started")
})