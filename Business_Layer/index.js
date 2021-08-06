const { residentDetails, owners, modifyOwner, removeOwner } = require("./house/owner")
const { houseInfo, fetchCompleteDetails, fetchSearchQuery, modifyHouse } = require("./house/house_info")
const { tenants, removeTenants, modifyTenants } = require("./house/tenant")
const { signUp } = require("./credentials/signUp")


module.exports = {
    residentDetails, houseInfo, fetchCompleteDetails, owners, tenants, removeTenants, modifyTenants, modifyOwner, removeOwner, fetchSearchQuery, modifyHouse, signUp
}