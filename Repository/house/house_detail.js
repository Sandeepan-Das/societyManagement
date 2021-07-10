const collection = require("../../Database/db")

insertHouseDetails = async (data) => {

    const key = `houseDetails_${data.type}`
    try {
        const result = await collection.upsert(key, data)
    } catch (error) {
        console.log("A")
        throw (error)
    }
}

module.exports = insertHouseDetails
