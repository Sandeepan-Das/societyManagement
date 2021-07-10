const uniqid = require('uniqid');

const { insertOwner } = require("../../Repository/index")

ownerDetails = async (req, res) => {
    req.body.uuid = uniqid();

    try {

        const result = await insertOwner(req.body)
        res.send(200)
    } catch (error) {

        res.send(404);
    }

}

module.exports = ownerDetails