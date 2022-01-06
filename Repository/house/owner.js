const { collection, cluster } = require("../../Database/db")

insertResident = async (data) => {
    var options, query;
    const key = `${data.uuid}`

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
    const query = 'Select * FROM `house_details` WHERE type="Owner" AND leavingDateTime=""'
    try {
        const result2 = await cluster.query(query)
        return result2.rows
    } catch (error) {
        throw (error)
    }
}

fetchOwnerById = async (id) => {
    const query = 'SELECT * FROM house_details WHERE META().id=$1'
    options = { parameters: [id] }
    try {
        owner = await cluster.query(query, options)
        return owner.rows[0].house_details;

    } catch (error) {
        throw (error)
    }
}



updateOwner = async (data) => {
    try {

        query = 'UPDATE `house_details` AS hd SET hd.name=$1,hd.residents = $2,hd.parking=$3,hd.vehicleList=$4,hd.registeredNumber=$5 WHERE META(hd).id=$6'
        options = { parameters: [data.name, data.residents, data.parking, data.vehicleList, data.registeredNumber, data.uuid] }
        const result2 = await cluster.query(query, options)
    } catch (error) {

        throw (error)
    }
}

delOwner = async (roomNo, leavingDateTime) => {
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

        query = 'UPDATE `house_details` AS hd SET hd.leavingDateTime=$2 WHERE META(hd).id = $1'
        const options1 = { parameters: [ID2, leavingDateTime] }
        const result3 = await cluster.query(query, options1)

    } catch (error) {
        throw (error)
    }
}

module.exports = { insertResident, fetchOwner, updateOwner, delOwner, fetchOwnerById }