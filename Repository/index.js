const { insertResident, fetchOwner, updateOwner, delOwner } = require("./house/owner")
const { insertHouseInfo, fetchCompleteDetailsByKey, searchResult, updateHouse } = require("./house/house_info")
const { fetchTenant, delTenant, updateTenant } = require("./house/tenant")

module.exports = {
   searchResult, insertResident, insertHouseInfo, fetchOwner, fetchTenant, delTenant, updateTenant, updateOwner, delOwner, fetchCompleteDetailsByKey, updateHouse
}