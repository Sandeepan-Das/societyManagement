const express = require("express")
const route = express.Router()

const {signUpResident,generateNewAccessToken,logOutResident,loginResident} =require("../Business_Layer/index")

const auth = require("../middleWares/auth")

route.post("/api/signUp",signUpResident)
route.post("/api/newToken",generateNewAccessToken)

route.post("/api/logout",logOutResident)
route.post("/api/login",loginResident)

route.get("/api/test",auth,(req,res)=>{
    console.log(req.resident)
    res.send(200)
})

module.exports = route