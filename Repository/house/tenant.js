const { cluster,collection } = require("../../Database/db")

fetchTenant = async () => {
    const query = 'Select * FROM `house_details` WHERE type="Tenant" AND presentMember="yes"'
    try {
        const result2 = await cluster.query(query)
        return result2.rows
    } catch (error) {
        throw (error)
    }
}


delTenant = async (roomNo) => {
    const query = 'Select occupiedBy FROM `house_details` AS hd WHERE META(hd).id=$1'
    const query1 = 'UPDATE `house_details` AS hd SET hd.presentMember="no" WHERE META(hd).id = $1'
    const query2 = 'UPDATE `house_details` AS hd UNSET hd.occupiedBy WHERE META(hd).id = $1'
    const options = { parameters: [roomNo] }

    try {
        const result = await cluster.query(query, options)
        const tenantID = result.rows[0].occupiedBy

        const options1 = { parameters: [tenantID] }
        const result2 = await cluster.query(query1, options1)

        const result3 = await cluster.query(query2, options)
    } catch (error) {
        throw (error)
    }
}

updateTenant = async (data)=>{
    var tenantID ;
    const query = 'SELECT occupiedBy FROM `house_details` AS hd WHERE META(hd).id=$1' 
    const options = { parameters: [data.roomNo] }
    try {
        const result = await cluster.query(query, options)
        const tenantID = result.rows[0].occupiedBy

        const result2 = await collection.upsert(tenantID, data)
    } catch (error) {
        throw (error)
    }
}

module.exports = {
    fetchTenant,delTenant,updateTenant
}