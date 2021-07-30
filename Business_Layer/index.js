const { residentDetails, owners, modifyOwner,removeOwner } = require("./house/owner")
const { houseInfo, fetchHouseInfo ,fetchSearchQuery,modifyHouse} = require("./house/house_info")
const { tenants, removeTenants, modifyTenants } = require("./house/tenant")



module.exports = {
    residentDetails, houseInfo, fetchHouseInfo, owners, tenants, removeTenants, modifyTenants, modifyOwner,removeOwner,fetchSearchQuery,modifyHouse
}