const express = require("express")
const route = express.Router()

const { ownerDetails , houseInfo,fetchHouseInfo } = require("../Business_Layer/index")


route.post("/api/ownerDetails", ownerDetails)
route.post("/api/houseInfo", houseInfo)


route.get("/api/fetchHouseInfo/:id?/:name?",fetchHouseInfo)



module.exports = route