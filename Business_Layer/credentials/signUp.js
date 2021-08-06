const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const { signUpResident, searchResult } = require("../../Repository/index")
require("dotenv").config()

signUp = async (req, res) => {
    try {
        const resident = await searchResult(req.body.email)
        
        const pass = await bcrypt.hash(req.body.password, 8)
        const token = await jwt.sign({ email: req.body.email }, process.env.ACCESS_TOKEN)
        
        const result = await signUpResident(resident[0].hd.uuid, pass, token)
        res.status(200).send()
    } catch (error) {

    }
}

logOut = async (req, res) => {
    try {

    } catch (error) {

    }
}

module.exports = {
    signUp
}