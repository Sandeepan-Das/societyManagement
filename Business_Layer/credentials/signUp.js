const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const createError = require("http-errors")

const { signUp, searchResult, fetchOwnerById, logout, login } = require("../../Repository/index")
require("dotenv").config()

signUpResident = async (req, res, next) => {
    try {
        const resident = await searchResult(req.body.email)
        if (!resident) throw createError(404, "Email not registered")
        const pass = await bcrypt.hash(req.body.password, 8)
        const accessToken = await jwt.sign({ uuid: resident[0].hd.uuid }, process.env.ACCESS_TOKEN, { expiresIn: "15m" })
        const refreshToken = await jwt.sign({ uuid: resident[0].hd.uuid }, process.env.REFRESH_TOKEN)

        const result = await signUp(resident[0].hd.uuid, pass, refreshToken)
        res.status(200).send({ accessToken, refreshToken })
    } catch (error) {
        next(error)
    }
}

generateNewAccessToken = async (req, res, next) => {
    try {
        const refreshToken = req.body.token;
        if (!refreshToken) throw (createError(401, "Token Not Found"))

        const data = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN)
        const resident = await fetchOwnerById(data.uuid)

        if (!resident.tokens.includes(refreshToken)) res.sendStatus(403)
        const accessToken = await jwt.sign({ uuid: data.uuid }, process.env.ACCESS_TOKEN, { expiresIn: "15m" })

        res.send({ accessToken })

    } catch (error) {
        next(error)
    }
}

logOutResident = async (req, res) => {
    try {
        const refreshToken = req.body.token
        const data = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN)

        const resident = await fetchOwnerById(data.uuid)

        if (!resident.tokens.includes(refreshToken)) res.sendStatus(403)

        var tokens = resident.tokens.filter((token) => {
            token !== refreshToken
        })
        resident.tokens = tokens
        const result = await logout(data.uuid, tokens)
        res.status(200).send()
    } catch (error) {
        console.log(error)
        res.sendStatus(404)
    }
}

loginResident = async (req,res,next) => {
    try {
        const resident = await searchResult(req.body.email)
        if (!resident) throw createError(404, "Wrong Email Or password")
        const pass = await bcrypt.compare(req.body.password, resident[0].hd.pass)
        const accessToken = await jwt.sign({ uuid: resident[0].hd.uuid }, process.env.ACCESS_TOKEN, { expiresIn: "15m" })
        const refreshToken = await jwt.sign({ uuid: resident[0].hd.uuid }, process.env.REFRESH_TOKEN)

        const result = await login(resident[0].hd.uuid, refreshToken)
        res.status(200).send({ accessToken, refreshToken })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signUpResident, logOutResident, generateNewAccessToken, loginResident
}