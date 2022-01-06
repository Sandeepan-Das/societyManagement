const express = require('express')


const app = express()

const { raiseIssue,fetchPendingIssueByAdmin } = require("../Business_Layer/index")
const auth = require("../middleWares/auth")

app.post('/api/raiseIssue',auth, raiseIssue)
app.get('/api/fetchIssueAdmin', fetchPendingIssueByAdmin)


module.exports = app