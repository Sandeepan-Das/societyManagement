/*
type:
rooms:
balcony:
floor:
bathrooms:


*/

const { inserthouseDetails } = require("../../Repository/index")

houseDetails = async(req, res) => {
    try {

        const result = await inserthouseDetails(req.body)
        res.send(200)    
    } catch (error) {
        
        res.send(404);
    }
    
}

module.exports = houseDetails