const express = require("express")
const route = express.Router()

const { residentDetails, houseInfo, fetchHouseInfo, owners, tenants, removeTenants, modifyTenants, modifyOwner,removeOwner,fetchSearchQuery,modifyHouse } = require("../Business_Layer/index")


route.post("/api/ownerDetails", residentDetails)
route.post("/api/houseInfo", houseInfo)


route.get("/api/fetchHouseInfo/:id?/:name?", fetchHouseInfo)
route.get("/api/fetchSearchQuery/:data", fetchSearchQuery)
route.get("/api/fetchOwners", owners)
route.get("/api/fetchTenants", tenants)



route.put("/api/update/tenant", modifyTenants)
route.put("/api/update/owner", modifyOwner)
route.put("/api/update/house", modifyHouse)

route.delete("/api/del/tenant/:id", removeTenants)
route.delete("/api/del/owner/:id", removeOwner)

module.exports = route