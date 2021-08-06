const jwt = require("jsonwebtoken")
require("dotenv").config()

verifyToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) res.sendStatus(404)

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, resident) => {
        if (err) res.sendStatus(403)
        req.resident = resident
    })
    next()
}

module.exports = verifyToken