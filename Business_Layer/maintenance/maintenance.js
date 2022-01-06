const createError = require("http-errors")
const id = require("uniqid")
const momnent = require("moment")

const {addPendingIssue,fetchIssueFromAdmin } = require("../../Repository/index")

const raiseIssue = async (req, res, next) => {
    try {
        req.body.issueRaiseTiming = momnent().format('YYYY-MM-DD:hh:mm:ss')
        req.body.uuid = id();

        await addPendingIssue(req.body,req.tokenData.uuid)
        res.send({});
    } catch (error) {
        
    }
}

const fetchPendingIssueByAdmin = async (req, res, next) => {
    try {
        

       const data = await fetchIssueFromAdmin();
       console.log(data.pendingIssue)
        res.status(200).send({data:data.pendingIssue});
    } catch (error) {
        
    }
}


module.exports = {
    raiseIssue, fetchPendingIssueByAdmin
}