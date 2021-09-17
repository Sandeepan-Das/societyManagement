const uniqid = require('uniqid');
const { insertHouseInfo, fetchHouseByAddr, searchResult, updateHouse, fetchOwnerById, fetchTenantById, fetchHouseByKey } = require("../../Repository/index")

houseInfo = async (req, res) => {
    try {
        req.body.type = "Room"
        req.body.uuid = uniqid()
        req.body.addr = `${req.body.block}-${req.body.roomNo}`
        const result = await insertHouseInfo(req.body)
        res.status(200).send()
    } catch (error) {

        res.sendStatus(404)
    }

}



// fetchHouseInfo = async (req, res) => {
//     if (req.query.id) {
//         const houseNo = req.query.id

//         try {
//             const result = await fetchOccupiedbyRoomNo(houseNo)

//             res.send(result)
//         } catch (error) {

//             res.send(404);
//         }
//     } else
//         if (req.query.name) {
//             const name = req.query.name

//             try {
//                 const result = await fetchOccupiedbyName(name)

//                 res.send(result)
//             } catch (error) {

//                 res.send(404);
//             }
//         }
// }
fetchCompleteDetails = async (req, res) => {
    const key = req.query.id;
    var data = {}
    var houseInfo, owner, tenant
    try {

        houseInfo = await fetchHouseByAddr(key)
        if (houseInfo.ownedBy != undefined) {
            owner = await fetchOwnerById(houseInfo.ownedBy)
            const result = await fetchHouseByKey(owner.roomNo)
            owner.roomNo = result.addr
        }
        if ((houseInfo.ownedBy != houseInfo.occupiedBy) && houseInfo.occupiedBy != undefined) {
            tenant = await fetchTenantById(houseInfo.occupiedBy)
            const result = await fetchHouseByKey(tenant.roomNo)
            tenant.roomNo = result.addr
        }
        data.houseInfo = houseInfo
        data.owner = owner
        data.tenant = tenant
        res.status(200).send({ data })
    } catch (error) {

    }

}

fetchSearchQuery = async (req, res) => {
    try {

        const data = await searchResult(req.params.data)
        for (const element of data) {

            const result = await fetchHouseByKey(element.hd.roomNo)
            element.hd.roomNo = result.addr
            
        }

        
        res.send({ data })
    } catch (error) {

    }
}

modifyHouse = async (req, res) => {
    try {
        req.body.addr = `${req.body.block}-${req.body.roomNo}`
        const data = await updateHouse(req.body)
        res.status(200).send()

    } catch (error) {

    }
}
module.exports = { houseInfo, fetchCompleteDetails, fetchSearchQuery, modifyHouse }