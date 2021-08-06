const express = require("express")
const route = express.Router()

const {signUp} =require("../Business_Layer/index")

const auth = require("../middleWares/auth")

route.post("/api/signUp",signUp)

route.get("/api/test",auth,(req,res)=>{
    console.log(req.resident)
    res.send(200)
})

module.exports = route