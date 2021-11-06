const { cluster } = require("../../Database/db")



const addPendingIssue = async (issueDetails, uuid) => {
    try {
        const query = 'UPDATE `house_details` AS hd SET hd.pendingIssue=array_append(ifmissing(hd.pendingIssue, []), $1) WHERE META(hd).id = $2 '
        const query1 = 'UPDATE `house_details` AS hd SET hd.pendingIssue=array_append(ifmissing(hd.pendingIssue, []), $1) WHERE type="Admin" '
        const options = { parameters: [issueDetails, uuid] }
        const options1 = { parameters: [issueDetails] }
        const result = await cluster.query(query, options)
        const result1 = await cluster.query(query1, options1)
    } catch (error) {

        throw (error)
    }
}
const fetchIssueFromAdmin = async () => {
    try {
        const query = 'SELECT pendingIssue FROM `house_details` WHERE type="Admin" '
        
        const options = { parameters: [] }
        
        const result = await cluster.query(query, options)

        return result.rows[0];
        
    } catch (error) {

        throw (error)
    }
}



module.exports = { addPendingIssue,fetchIssueFromAdmin}
