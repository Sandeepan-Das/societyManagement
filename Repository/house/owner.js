const collection = require("../../Database/db")
/*
    name
    type
    uuid
    Family Members 
        name
        relation
    Parking
    Vehicle
    Phone_Number
 */

insertOwner = async (data) => {
    const key = `${data.type}_${data.uuid}`
    try {
        const result = await collection.upsert(key, data)
    } catch (error) {

        throw (error)
    }
}

module.exports = insertOwner