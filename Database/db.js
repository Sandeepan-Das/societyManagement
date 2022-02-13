var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://192.168.29.175:8091', {
    username: "Administrator",
    password: "password",
});
const bucket = cluster.bucket("house_details");
const collection = bucket.defaultCollection();
// var N1qlQuery = couchbase.N1qlQuery;


module.exports = {collection,cluster};