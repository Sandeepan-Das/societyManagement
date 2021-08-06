const { collection, cluster } = require("../../Database/db")

searchResult = async (data) => {
    const param = {

        "match": data,
        "analyzer": "standard"

    }
    var query = 'SELECT * FROM `house_details` AS hd WHERE SEARCH(hd,$1) AND hd.leavingDateTime="";'
    const options = { parameters: [param] }


    try {
        const result = await cluster.query(query, options)

        return result.rows
    } catch (error) {

        throw (error)
    }
}

insertHouseInfo = async (data) => {
    const key = data.uuid
    try {
        const result = await collection.upsert(key, data)
    } catch (error) {

        throw (error)
    }
}
// insertHouseInfo = async (data) => {
//     const key = `${data.block}-${data.roomNo}`
//     try {
//         const result = await collection.upsert(key, data)
//     } catch (error) {

//         throw (error)
//     }
// }

// fetchOccupiedbyRoomNo = async (data) => {


//     var query = 'SELECT * FROM house_details AS hd JOIN house_details AS h ON META(h).id= hd.occupiedBy  WHERE META(hd).id=$1'
//     const options = { parameters: [data] }


//     try {
//         const result = await cluster.query(query, options)

//         return result.rows
//     } catch (error) {

//         throw (error)
//     }
// }

// fetchOccupiedbyName = async (data) => {


//     var query = 'SELECT * FROM house_details AS hd JOIN house_details AS h ON  hd.occupiedBy = META(h).id AND h.residents.name=$1 WHERE hd.type="Room"'
//     const options = { parameters: [data] }


//     try {
//         const result = await cluster.query(query, options)

//         return result.rows
//     } catch (error) {

//         throw (error)
//     }
// }

fetchHouseByAddr = async (data) => {
    var houseInfo, owner, tenant;
    try {
        var query = 'SELECT * FROM house_details WHERE house_details.addr=$1'
        var options = { parameters: [data] }
        houseInfo = await cluster.query(query, options)
        return houseInfo.rows[0].house_details;

    } catch (error) {

    }
    return {
        houseInfo, owner, tenant
    }

}
fetchHouseByKey = async (data) => {
    var houseInfo, owner, tenant;
    try {
        var query = 'SELECT * FROM house_details WHERE META().id=$1'
        var options = { parameters: [data] }
        houseInfo = await cluster.query(query, options)
        return houseInfo.rows[0].house_details;

    } catch (error) {

    }
    return {
        houseInfo, owner, tenant
    }

}
// fetchCompleteDetailsByKey = async (data) => {
//     var houseInfo, owner, tenant;
//     try {



//         var query = 'SELECT * FROM house_details WHERE META().id=$1'
//         var options = { parameters: [data] }
//         houseInfo = await cluster.query(query, options)
//         houseInfo = houseInfo.rows[0];

//         if (houseInfo.house_details.ownedBy != undefined)
//             query = 'SELECT * FROM house_details WHERE META().id=$1'
//         options = { parameters: [houseInfo.house_details.ownedBy] }
//         owner = await cluster.query(query, options)
//         owner = owner.rows[0];

//         if ((houseInfo.house_details.ownedBy != houseInfo.house_details.occupiedBy) && houseInfo.house_details.occupiedBy != undefined) {

//             query = 'SELECT * FROM house_details WHERE META().id=$1'
//             options = { parameters: [houseInfo.house_details.occupiedBy] }
//             tenant = await cluster.query(query, options)
//             tenant = tenant.rows[0];
//         }

//     } catch (error) {

//     }
//     return {
//         houseInfo, owner, tenant
//     }

// }

updateHouse = async (data) => {

    try {
        
        var query = 'UPDATE `house_details` AS hd SET hd.houseType=$1, hd.block=$3, hd.roomNo=$4, hd.addr=$5 WHERE META(hd).id = $2 '
        var options = { parameters: [data.houseType, data.uuid, data.block, data.roomNo, data.addr] }
        houseInfo = await cluster.query(query, options)
    } catch (error) {

    }

}

module.exports = {
    insertHouseInfo, fetchHouseByAddr, searchResult, updateHouse,fetchHouseByKey
}