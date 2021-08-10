const { residentDetails, owners, modifyOwner, removeOwner } = require("./house/owner")
const { houseInfo, fetchCompleteDetails, fetchSearchQuery, modifyHouse } = require("./house/house_info")
const { tenants, removeTenants, modifyTenants } = require("./house/tenant")
const { signUpResident, logOutResident, generateNewAccessToken, loginResident } = require("./credentials/signUp")


module.exports = {
    loginResident,
    residentDetails, houseInfo, fetchCompleteDetails, owners, tenants, removeTenants, modifyTenants, modifyOwner, removeOwner, fetchSearchQuery, modifyHouse, signUpResident, logOutResident, generateNewAccessToken
}