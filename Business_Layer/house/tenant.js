const momnent = require("moment");
const { fetchTenant, delTenant, updateTenant } = require("../../Repository/index")

tenants = async (req, res) => {

    try {

        const result = await fetchTenant()
        res.send(result)
    } catch (error) {

        res.sendStatus(404)
    }

}

removeTenants = async (req, res) => {
    var roomNo = req.params.id

    try {
        const result = await fetchHouseByAddr(roomNo);
        roomNo = result.uuid
        const result2 = await delTenant(roomNo, momnent().format('YYYY-MM-DD:hh:mm:ss'))
        res.status(200).send()
    } catch (error) {
        res.sendStatus(404)
    }
}

modifyTenants = async (req, res) => {
    try {
        const result = await updateTenant(req.body)
        res.status(200).send()
    } catch (error) {
        res.sendStatus(404)
    }
}

module.exports = {
    tenants, removeTenants, modifyTenants
}