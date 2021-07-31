const uniqid = require('uniqid');
const momnent = require("moment")

const { insertResident, fetchOwner, updateOwner, delOwner } = require("../../Repository/index")

residentDetails = async (req, res) => {
    req.body.joiningDateTime = momnent().format('YYYY-MM-DD:hh:mm:ss')
    // req.body.presentMember = "yes"
    req.body.leavingDateTime = ""
    try {

        const result = await insertResident(req.body,uniqid())
        res.sendStatus(200)
    } catch (error) {

        res.sendStatus(404)
    }

}

owners = async (req, res) => {

    try {

        const result = await fetchOwner()
        res.send(result)
    } catch (error) {

        res.sendStatus(404)
    }

}

modifyOwner = async (req, res) => {
    try {
        const result = await updateOwner(req.body)
        res.sendStatus(200)
    } catch (error) {

        res.sendStatus(404)
    }
}

removeOwner = async (req, res) => {
    const roomNo = req.params.id
    try {

        const result = await delOwner(roomNo,momnent().format('YYYY-MM-DD:hh:mm:ss'))
        res.sendStatus(200)
    } catch (error) {

        res.sendStatus(404)
    }
}

module.exports = { residentDetails, owners, modifyOwner, removeOwner }