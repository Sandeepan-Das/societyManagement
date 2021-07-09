const express = require("express")
const route = express.Router()

const details = require("../Business_Layer/house_detail/house_detail")
route.post("/api/houseDetails",details.houseDetails)

module.exports = route