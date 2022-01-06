const { fetchPendingRequestSecurity, delFromPendingSecurity, updatePastOrderSecurity } = require("../../Repository/index")


const checkRequestSecurity = async (req, res) => {
    try {

        const data = await fetchPendingRequestSecurity()
        res.status(200).send({ data })
    } catch (error) {

    }

}


const pastlistSecurity = async (req, res) => {
    try {
        var data = await fetchPendingRequestSecurity()
        
        data = data.filter((packageRequest) => {
            return packageRequest.id != req.body.id
        })
        // console.log(data)
        const result = await delFromPendingSecurity(data)
        const result2 = await updatePastOrderSecurity(req.body)
        res.status(200).send()
    } catch (error) {

    }

}

module.exports = {
    checkRequestSecurity, pastlistSecurity
}