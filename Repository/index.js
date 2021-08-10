const { insertResident, fetchOwner, updateOwner, delOwner, fetchOwnerById } = require("./house/owner")
const { insertHouseInfo, fetchHouseByAddr, searchResult, updateHouse, fetchHouseByKey } = require("./house/house_info")
const { fetchTenant, delTenant, updateTenant, fetchTenantById } = require("./house/tenant")
const { signUp, logout, login } = require("./credentials/signUp")

module.exports = {
   searchResult, insertResident, insertHouseInfo, fetchOwner, fetchTenant, delTenant, updateTenant, updateOwner, delOwner, fetchHouseByAddr, updateHouse, fetchOwnerById, fetchTenantById, fetchHouseByKey, signUp, logout, login
}