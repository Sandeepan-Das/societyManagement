const express = require('express')
// const faceapi = require("")

const app = express()

const { saveProfile, check, workerPayment, saveCurrentExpenditure, currentBill, divideBill,monthlyBill,allWorkers } = require("../Business_Layer/index")
const auth = require("../middleWares/auth")

app.post('/api/workerProfile', saveProfile)
app.post('/api/verifyProfile', check)
app.post('/api/saveExpenditure', saveCurrentExpenditure)
app.post('/api/sendExpenditure', divideBill)

app.get("/api/workerPayment", workerPayment)
app.get("/api/currentBill", currentBill)
app.get("/api/workerList", allWorkers)
app.get("/api/monthlyBill",auth, monthlyBill)


module.exports = app