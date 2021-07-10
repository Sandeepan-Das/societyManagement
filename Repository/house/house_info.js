const collection = require("../../Database/db")
/*
    type:Room
    roomNo:
    block:
    currentlyOccupied:
    houseType:
 */

insertHouseInfo = async (data) => {
    const key = `${data.block}_${data.roomNo}`
    try {
        const result = await collection.upsert(key, data)
    } catch (error) {

        throw (error)
    }
}

module.exports = insertHouseInfo