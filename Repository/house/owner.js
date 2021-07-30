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

insertResident = async (data, uuid) => {
    var options, query;
    const key = `${data.type}_${uuid}`

    if (data.type === "Owner" && data.occupiedBy === "no") {
        query = 'UPDATE `house_details` AS hd SET hd.ownedBy = $1 WHERE META(hd).id = $2'
    }
    else if (data.type === "Owner" && data.occupiedBy === "yes") {
        query = 'UPDATE `house_details` AS hd SET hd.occupiedBy = $1,hd.ownedBy=$1 WHERE META(hd).id = $2'

    } else if (data.type === "Tenant") {
        query = 'UPDATE `house_details` AS hd SET hd.occupiedBy = $1 WHERE META(hd).id = $2'
    }
    options = { parameters: [key, data.roomNo] }
    try {
        const result = await collection.upsert(key, data)
        const result2 = await cluster.query(query, options)

    } catch (error) {
        throw (error)
    }
}

fetchOwner = async () => {
    const query = 'Select * FROM `house_details` WHERE type="Owner" AND presentMember="yes"'
    try {
        const result2 = await cluster.query(query)
        return result2.rows
    } catch (error) {
        throw (error)
    }
}

updateOwner = async (data) => {
    var query = 'SELECT ownedBy FROM `house_details` AS hd WHERE META(hd).id=$1'
    var options = { parameters: [data.roomNo] }
    try {
        const result = await cluster.query(query, options)
        const ownerID = result.rows[0].ownedBy

        const result2 = await collection.upsert(ownerID, data)
    } catch (error) {
        throw (error)
    }
}

delOwner = async (roomNo) => {
    var query = 'Select hd.ownedBy,hd.occupiedBy FROM `house_details` AS hd WHERE META(hd).id=$1'

    const options = { parameters: [roomNo] }

    try {
        const result = await cluster.query(query, options)
        const ID1 = result.rows[0].occupiedBy
        const ID2 = result.rows[0].ownedBy

        if (ID1 === ID2) { query = 'UPDATE `house_details` AS hd UNSET hd.occupiedBy,hd.ownedBy WHERE META(hd).id = $1' }
        else {
            query = "UPDATE `house_details` AS hd UNSET hd.ownedBy WHERE META(hd).id = $1"
        }
        const result2 = await cluster.query(query, options)

        query = 'UPDATE `house_details` AS hd SET hd.presentMember="no" WHERE META(hd).id = $1'
        const options1 = { parameters: [ID2] }
        const result3 = await cluster.query(query, options1)

    } catch (error) {
        throw (error)
    }
}

module.exports = { insertResident, fetchOwner, updateOwner, delOwner }