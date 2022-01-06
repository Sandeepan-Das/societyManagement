const uniqid = require('uniqid');

const { updatePendingRequest, fetchPendingRequest, updatePendingRequestSecurity, fetchOwnerById, delFromPending, changeValidSecurity, fetchPendingRequestSecurity } = require("../../Repository/index")

const pendingRequest = async (req, res) => {
    const packageRequest = {
        id: uniqid(),
        msg: req.body.message,
        valid: "PROCESSING",
        name: req.body.residentName,
        roomNo: req.body.roomNo,
        registeredNumber: req.body.registeredNumber,
    }
    try {
        await updatePendingRequest(packageRequest, req.body.uuid)
        await updatePendingRequestSecurity(packageRequest)
        res.status(200).send()
    } catch (error) {

    }

}

const checkRequest = async (req, res) => {
    try {

        const data = await fetchPendingRequest(req.tokenData.uuid)
        res.status(200).send({ data })
    } catch (error) {

    }

}

const validtyRequest = async (req, res) => {
    try {
        const resident = await fetchOwnerById(req.tokenData.uuid)
        resident.pendingRequest = resident.pendingRequest.filter((packageRequest) => {
            return packageRequest.id != req.body.id
        })
        const result = await delFromPending(resident.pendingRequest, req.tokenData.uuid)
        const data = await fetchPendingRequestSecurity()

        for (let i = 0; i < data.length; i++) {
            const requestPackage = data[i];
            if (requestPackage.id == req.body.id) {
                requestPackage.valid = req.body.valid
            }
        }
        const result2 = await changeValidSecurity(data)
        res.status(200).send()
    } catch (error) {

    }

}

module.exports = {
    pendingRequest, checkRequest, validtyRequest
}