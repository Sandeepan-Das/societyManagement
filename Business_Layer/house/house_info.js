const { insertHouseInfo } = require("../../Repository/index")

houseInfo = async(req, res) => {
    try {

        const result = await insertHouseInfo(req.body)
        res.send(200)    
    } catch (error) {
        
        res.send(404);
    }
    
}

module.exports = houseInfo