const insertOwner = require("./house/owner")
const {insertHouseInfo,fetchOccupiedbyRoomNo,fetchOccupiedbyName} = require("./house/house_info")

module.exports = {
    insertOwner,insertHouseInfo,fetchOccupiedbyRoomNo,fetchOccupiedbyName
}