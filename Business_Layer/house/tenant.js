const { fetchTenant, delTenant, updateTenant } = require("../../Repository/index")

tenants = async (req, res) => {

    try {

        const result = await fetchTenant()
        res.send(result)
    } catch (error) {

        res.send(404);
    }

}

removeTenants = async (req, res) => {
    const id = req.params.id

    try {
        const result = await delTenant(id)
        res.send(200)
    } catch (error) {
        res.send(404)
    }
}

modifyTenants = async (req, res) => {
    try {
        const result = await updateTenant(req.body)
        res.send(200)
    } catch (error) {
        res.send(404)
    }
}

module.exports = {
    tenants, removeTenants, modifyTenants
}