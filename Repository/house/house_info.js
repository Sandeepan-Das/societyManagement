const { collection, cluster } = require("../../Database/db")

searchResult = async (data) => {
    const param = {

        "match": data,
        "analyzer": "standard"

    }
    var query = 'SELECT * FROM `house_details` AS hd JOIN `house_details` AS h ON META(h).id = hd.roomNo WHERE (SEARCH(hd,$1) OR SEARCH(h,$1)) AND hd.leavingDateTime="";'
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

fetchHouseByAddr = async (data) => {
    // var houseInfo, owner, tenant;
    try {
        var query = 'SELECT * FROM house_details WHERE house_details.addr=$1'
        var options = { parameters: [data] }
        houseInfo = await cluster.query(query, options)
        return houseInfo.rows[0].house_details;

    } catch (error) {

    }
    // return {
    //     houseInfo, owner, tenant
    // }

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

updateHouse = async (data) => {

    try {
        
        var query = 'UPDATE `house_details` AS hd SET hd.houseType=$1, hd.block=$3, hd.roomNo=$4, hd.addr=$5 WHERE META(hd).id = $2 '
        var options = { parameters: [data.houseType, data.uuid, data.block, data.roomNo, data.addr] }
        houseInfo = await cluster.query(query, options)
    } catch (error) {

    }

}



module.exports = {
    insertHouseInfo, fetchHouseByAddr, searchResult, updateHouse, fetchHouseByKey
}