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
    const id = req.params.id

    try {
        const result = await delTenant(id)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(404)
    }
}

modifyTenants = async (req, res) => {
    try {
        req.body.presentMember = "yes"
        req.body.type = "Tenant"
        const result = await updateTenant(req.body)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(404)
    }
}

module.exports = {
    tenants, removeTenants, modifyTenants
}