const collection = require("../../Database/db")

exports.insertHouseDetails = async (data) => {

    const key = `houseDetails_${data.type}`
    try {
        const result = await collection.upsert(key, data)
    } catch (error) {
        throw new Error
    }
}

// module.exports = insertHouseDetails()