const { residentDetails, owners, modifyOwner, removeOwner } = require("./house/owner")
const { houseInfo, fetchCompleteDetails, fetchSearchQuery, modifyHouse } = require("./house/house_info")
const { tenants, removeTenants, modifyTenants } = require("./house/tenant")
const { signUpResident, logOutResident, generateNewAccessToken, loginResident } = require("./credentials/signUp")
const {fetchResident} = require("./house/resident")
const {pendingRequest,checkRequest,validtyRequest} = require("./packageNotification/notify")
const {checkRequestSecurity,pastlistSecurity} = require("./packageNotification/security")

module.exports = {
    loginResident,fetchResident,pendingRequest,checkRequest,validtyRequest,checkRequestSecurity,pastlistSecurity,
    residentDetails, houseInfo, fetchCompleteDetails, owners, tenants, removeTenants, modifyTenants, modifyOwner, removeOwner, fetchSearchQuery, modifyHouse, signUpResident, logOutResident, generateNewAccessToken
}