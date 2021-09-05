const express = require('express')
const bodyparser = require("body-parser")
const cors = require("cors")
const http = require("http")
const socketIo = require("socket.io")

const houseRoute = require("./Routes/houseRoute")
const credentialRoute = require("./Routes/credentialRoute")
const packageRoute = require("./Routes/packageRoute")

const errorHandler = require("./error/apiError")


const app = express()
const port = 3000 || process.env.PORT
const httpServer = http.createServer(app);

//Middlewares
app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }))
const io = socketIo(httpServer)


app.use(houseRoute)
app.use(credentialRoute)
app.use(packageRoute)
app.use(errorHandler)

// io.on("connection",socketConnection)

//Server Started
httpServer.listen(port, () => {
    console.log("Server Started")
})
