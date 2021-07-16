const { collection, cluster } = require("../../Database/db")
/*
    name
    type
    uuid
    Family Members 
        name
        relation
    parking
    vehicle
    phone_Number
    roomNo"
 */

insertOwner = async (data) => {
    var options,query;
    const key = `${data.type}_${data.uuid}`

    if (data.occupiedBy === "yes") {
        query = 'UPDATE `house_details` AS hd SET hd.occupiedBy = $1,hd.ownedBy=$3 WHERE META(hd).id = $2'
        options = { parameters: [key, data.roomNo, key] }
    }
    else {
        query = 'UPDATE `house_details` AS hd SET hd.ownedBy = $1 WHERE META(hd).id = $2'
        options = { parameters: [key, data.roomNo] }
    }

    try {
        const result = await collection.upsert(key, data)
        const result2 = await cluster.query(query, options)

    } catch (error) {
        throw (error)
    }
}

module.exports = insertOwner