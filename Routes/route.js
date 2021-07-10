const express = require("express")
const route = express.Router()

const { houseDetails } = require("../Business_Layer/index")
route.post("/api/houseDetails", houseDetails)

module.exports = route