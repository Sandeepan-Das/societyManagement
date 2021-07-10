const collection = require("../../Database/db")

insertHouseDetails = async (data) => {

    const key = `houseDetails_${data.type}`
    try {
        const result = await collection.upsert(key, data)
    } catch (error) {
        
        throw (error)
    }
}

module.exports = insertHouseDetails
