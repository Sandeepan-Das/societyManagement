var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://127.0.0.1', {
    username: "Administrator",
    password: "password",
});
const bucket = cluster.bucket("house_details");
const collection = bucket.defaultCollection();
// var N1qlQuery = couchbase.N1qlQuery;


module.exports = {collection,cluster};