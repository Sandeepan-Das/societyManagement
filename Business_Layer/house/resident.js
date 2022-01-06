const {fetchHouseByAddr,fetchOwnerById,fetchTenantById} = require("../../Repository/index")


const fetchResident = async (req,res,next)=>{
    const roomNo = req.query.roomNo
    const type = req.query.type

    try {
        if(type==="Owner"){
            const result = await fetchHouseByAddr(roomNo)
            const ownerID = result.ownedBy
            const result2 = await fetchOwnerById(ownerID)
            result2.roomNo = roomNo
            res.status(200).send(result2)
        }else if(type==="Tenant"){
            const result = await fetchHouseByAddr(roomNo)
            const tenantID = result.occupiedBy
            const result2 = await fetchTenantById(tenantID)
            result2.roomNo = roomNo
            res.status(200).send(result2)
        }
    } catch (error) {
        
    }
}

module.exports = {
    fetchResident
}