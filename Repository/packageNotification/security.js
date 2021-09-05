const { cluster } = require("../../Database/db")

const updatePendingRequestSecurity = async (requestDetails) => {
    try {
        const query = 'UPDATE `house_details` AS hd SET hd.pendingRequest=array_append(ifmissing(hd.pendingRequest, []), $1) WHERE type="Security"'
        const options = { parameters: [requestDetails] }
        const result = await cluster.query(query, options)
    } catch (error) {

        throw (error)
    }
}

const fetchPendingRequestSecurity = async () => {
    
    try {
        const query = 'SELECT pendingRequest FROM `house_details` WHERE type="Security"'
        const options = { parameters: [] }
        const result = await cluster.query(query, options)

        return result.rows[0].pendingRequest
    } catch (error) {

        throw (error)
    }
}

const changeValidSecurity = async (data)=>{
    try {
        const query = 'UPDATE `house_details` AS hd SET hd.pendingRequest=$1 WHERE type="Security" '
        const options = { parameters: [data] }
        const result = await cluster.query(query, options)
    } catch (error) {

        throw (error)
    }  
}

const delFromPendingSecurity = async (data)=>{
    try {
        const query = 'UPDATE `house_details` AS hd SET hd.pendingRequest=$1 WHERE type="Security" '
        const options = { parameters: [data] }
        const result = await cluster.query(query, options)
    } catch (error) {

        throw (error)
    }  
}
const updatePastOrderSecurity = async (data)=>{
    try {
        const query = 'UPDATE `house_details` AS hd SET hd.pastRequest=array_append(ifmissing(hd.pastRequest, []), $1) WHERE type="Security"'
        const options = { parameters: [data] }
        const result = await cluster.query(query, options)
    } catch (error) {

        throw (error)
    }  
}


module.exports = {
    updatePendingRequestSecurity,fetchPendingRequestSecurity,changeValidSecurity,delFromPendingSecurity,updatePastOrderSecurity
}