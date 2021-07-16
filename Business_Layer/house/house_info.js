const { insertHouseInfo, fetchOccupiedbyRoomNo ,fetchOccupiedbyName} = require("../../Repository/index")

houseInfo = async (req, res) => {
    try {

        const result = await insertHouseInfo(req.body)
        res.send(200)
    } catch (error) {

        res.send(404);
    }

}


fetchHouseInfo = async (req, res) => {
    if (req.query.id) {
        const houseNo = req.query.id

        try {
            const result = await fetchOccupiedbyRoomNo(houseNo)

            res.send(result)
        } catch (error) {

            res.send(404);
        }
    } else
        if (req.query.name) {
            const name = req.query.name

            try {
                const result = await fetchOccupiedbyName(name)

                res.send(result)
            } catch (error) {

                res.send(404);
            }
        }
}

module.exports = { houseInfo, fetchHouseInfo }