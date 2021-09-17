const express = require('express')
// const faceapi = require("")

const app = express()

const {saveProfile,check} = require("../Business_Layer/index")

app.post('/api/workerProfile', saveProfile)
app.post('/api/verifyProfile', check)


module.exports = app