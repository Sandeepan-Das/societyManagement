const { collection, cluster } = require("../../Database/db")


const fetchBlockMember = async (block) => {
    const query = 'Select * FROM `house_details` AS hd  JOIN `house_details` AS h ON hd.ownedBy=META(h).id WHERE hd.block= $1'
    try {
        const result2 = await cluster.query(query)
        const options = { parameters: [block] }
        return result2.rows
    } catch (error) {
        throw (error)
    }
}

const fetchResident = async()=>{
    const query = 'SELECT* FROM `house_details` AS hd WHERE type="Tenant" OR (type = "Owner" AND hd.occupiedBy = "yes")'
    try {
        const result2 = await cluster.query(query)
        return result2.rows
    } catch (error) {
        throw (error)
    }
}

const fetchFloorMembers = async()=>{
    const query = 'SELECT* FROM `house_details` AS hd WHERE type="Tenant" OR (type = "Owner" AND hd.occupiedBy = "yes")'
    try {
        const result2 = await cluster.query(query)
        return result2.rows
    } catch (error) {
        throw (error)
    }
}

module.exports = { fetchBlockMember,fetchResident}