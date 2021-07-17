const { insertResident, fetchOwner, updateOwner,delOwner } = require("./house/owner")
const { insertHouseInfo, fetchOccupiedbyRoomNo, fetchOccupiedbyName } = require("./house/house_info")
const { fetchTenant, delTenant, updateTenant } = require("./house/tenant")

module.exports = {
    insertResident, insertHouseInfo, fetchOccupiedbyRoomNo, fetchOccupiedbyName, fetchOwner, fetchTenant, delTenant, updateTenant, updateOwner,delOwner
}