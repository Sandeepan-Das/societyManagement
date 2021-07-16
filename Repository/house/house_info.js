const { collection, cluster } = require("../../Database/db")
/*
    type:Room
    roomNo:
    block:
    ownedBy:
    occupiedBy:
    houseType: 
            type:
            rooms:
            balcony:
            floor:
            bathrooms:
*/

insertHouseInfo = async (data) => {
    const key = `${data.block}-${data.roomNo}`
    try {
        const result = await collection.upsert(key, data)
    } catch (error) {

        throw (error)
    }
}

fetchOccupiedbyRoomNo = async (data) => {


    var query = 'SELECT * FROM house_details AS hd JOIN house_details AS h ON META(h).id= hd.occupiedBy  WHERE META(hd).id=$1'
    const options = { parameters: [data] }


    try {
        const result = await cluster.query(query, options)

        return result.rows
    } catch (error) {

        throw (error)
    }
}

fetchOccupiedbyName = async (data) => {


    var query = 'SELECT * FROM house_details AS hd JOIN house_details AS h ON  hd.occupiedBy = META(h).id AND h.residents.name=$1 WHERE hd.type="Room"'
    const options = { parameters: [data] }


    try {
        const result = await cluster.query(query, options)

        return result.rows
    } catch (error) {

        throw (error)
    }
}



module.exports = {
    insertHouseInfo, fetchOccupiedbyRoomNo,fetchOccupiedbyName
}