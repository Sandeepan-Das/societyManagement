const { insertResident, fetchOwner, updateOwner, delOwner,fetchOwnerById } = require("./house/owner")
const { insertHouseInfo, fetchHouseByAddr, searchResult, updateHouse,fetchHouseByKey } = require("./house/house_info")
const { fetchTenant, delTenant, updateTenant,fetchTenantById } = require("./house/tenant")
const {signUpResident} = require("./credentials/signUp")

module.exports = {
   searchResult, insertResident, insertHouseInfo, fetchOwner, fetchTenant, delTenant, updateTenant, updateOwner, delOwner, fetchHouseByAddr, updateHouse, signUpResident,fetchOwnerById,fetchTenantById,fetchHouseByKey
}