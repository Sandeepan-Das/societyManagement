const uniqid = require('uniqid');

const { insertResident, fetchOwner, updateOwner, delOwner } = require("../../Repository/index")

residentDetails = async (req, res) => {
    req.body.uuid = uniqid();
    req.body.presentMember = "yes"
    try {

        const result = await insertResident(req.body)
        res.send(200)
    } catch (error) {

        res.send(404);
    }

}

owners = async (req, res) => {

    try {

        const result = await fetchOwner()
        res.send(result)
    } catch (error) {

        res.send(404);
    }

}

modifyOwner = async (req, res) => {
    try {

        const result = await updateOwner(req.body)
        res.send(200)
    } catch (error) {

        res.send(404);
    }
}

removeOwner = async (req, res) => {
    const roomNo = req.params.id
    try {

        const result = await delOwner(roomNo)
        res.send(200)
    } catch (error) {

        res.send(404);
    }
}

module.exports = { residentDetails, owners, modifyOwner,removeOwner }