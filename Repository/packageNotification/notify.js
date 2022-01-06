const { cluster } = require("../../Database/db")



const updatePendingRequest = async (requestDetails, uuid) => {
    try {
        const query = 'UPDATE `house_details` AS hd SET hd.pendingRequest=array_append(ifmissing(hd.pendingRequest, []), $1) WHERE META(hd).id = $2 '
        const options = { parameters: [requestDetails, uuid] }
        const result = await cluster.query(query, options)
    } catch (error) {

        throw (error)
    }
}

const fetchPendingRequest = async (uuid) => {
    try {
        const query = 'SELECT pendingRequest FROM `house_details` WHERE META().id=$1'
        const options = { parameters: [uuid] }
        const result = await cluster.query(query, options)

        return result.rows[0].pendingRequest
    } catch (error) {

        throw (error)
    }
}


const delFromPending = async (data,uuid)=>{
    try {
        const query = 'UPDATE `house_details` AS hd SET hd.pendingRequest=$1 WHERE META(hd).id = $2 '
        const options = { parameters: [data,uuid] }
        const result = await cluster.query(query, options)
    } catch (error) {

        throw (error)
    }  
}


module.exports = { updatePendingRequest, fetchPendingRequest,delFromPending}
