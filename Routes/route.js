const express = require("express")
const route = express.Router()

const { houseDetails, ownerDetails , houseInfo } = require("../Business_Layer/index")


route.post("/api/houseDetails", houseDetails)
route.post("/api/ownerDetails", ownerDetails)
route.post("/api/houseInfo", houseInfo)



module.exports = route