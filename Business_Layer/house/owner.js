const uniqid = require('uniqid');
const momnent = require("moment")

const { insertResident, fetchOwner, updateOwner, delOwner, fetchHouseByAddr } = require("../../Repository/index")

residentDetails = async (req, res) => {
    req.body.joiningDateTime = momnent().format('YYYY-MM-DD:hh:mm:ss')
    // req.body.presentMember = "yes"
    req.body.leavingDateTime = ""
    req.body.uuid = uniqid()
    try {
        const result = await fetchHouseByAddr(req.body.roomNo)
        req.body.roomNo = result.uuid;
        try {

            const result = await insertResident(req.body)
            res.status(200).send()
        } catch (error) {

            res.sendStatus(404)
        }
    } catch (error) {

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
        const result2 = await updateOwner(req.body)
        res.status(200).send()
    } catch (error) {

        res.sendStatus(404)
    }
}

removeOwner = async (req, res) => {
    var roomNo = req.params.id
    try {
        const result = await fetchHouseByAddr(roomNo);
        roomNo = result.uuid
        const result2 = await delOwner(roomNo, momnent().format('YYYY-MM-DD:hh:mm:ss'))
        res.status(200).send()
    } catch (error) {

        res.sendStatus(404)
    }
}

module.exports = { residentDetails, owners, modifyOwner, removeOwner }