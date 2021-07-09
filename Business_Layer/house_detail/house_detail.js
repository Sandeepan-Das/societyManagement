/*
type:
rooms:
balcony:
floor:
bathrooms:


*/


const insertDB = require("../../Repository/house_detail/house_detail")

exports.houseDetails = (req, res) => {
    try {

        insertDB.insertHouseDetails(req.body)
        res.send(200)
    } catch (error) {
        res.send(404);
    }
}