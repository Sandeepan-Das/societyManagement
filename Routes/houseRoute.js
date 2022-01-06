const express = require("express")
const { graphqlHTTP } = require("express-graphql")

const route = express.Router()

const {fetchResident, residentDetails, houseInfo, fetchCompleteDetails, owners, tenants, removeTenants, modifyTenants, modifyOwner, removeOwner, fetchSearchQuery, modifyHouse } = require("../Business_Layer/index")
const auth = require("../middleWares/auth")

const { schema } = require("../graphQL/schema")
const resolver = require("../graphQL/resolver")

route.post("/api/ownerDetails", residentDetails)
route.post("/api/houseInfo", houseInfo)


route.get("/api/fetchHouseInfo/:id?", fetchCompleteDetails)
route.get("/api/fetchResidentInfo/:roomNo?/:type?", fetchResident)
route.get("/api/fetchSearchQuery/:data", fetchSearchQuery)
route.get("/api/fetchOwners", owners)
route.get("/api/fetchTenants", tenants)
route.get("/api/uuid",auth,(req,res)=>{
    res.status(200).send({uuid:req.resident.uuid})
})


route.put("/api/update/tenant", modifyTenants)
route.put("/api/update/owner", modifyOwner)
route.put("/api/update/house", modifyHouse)

route.delete("/api/del/tenant/:id", removeTenants)
route.delete("/api/del/owner/:id", removeOwner)

route.use("/api/house", graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
}))

module.exports = route