const { insertHouseInfo, fetchCompleteDetailsByKey,searchResult,updateHouse } = require("../../Repository/index")

houseInfo = async (req, res) => {
    try {
        req.body.type = "Room"
        const result = await insertHouseInfo(req.body)
        res.sendStatus(200)
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
fetchHouseInfo = async (req, res) => {
    const key = req.query.id;
    try {

        const data = await fetchCompleteDetailsByKey(key)
        res.send({data})
    } catch (error) {

    }

}

fetchSearchQuery = async (req,res)=>{
    try {

        const data = await searchResult(req.params.data)
        res.send({data})
    } catch (error) {

    }
}

modifyHouse = async (req,res)=>{
    try {

        const data = await updateHouse(req.body)
        res.sendStatus(200)
        
    } catch (error) {

    }
}
module.exports = { houseInfo, fetchHouseInfo ,fetchSearchQuery,modifyHouse}