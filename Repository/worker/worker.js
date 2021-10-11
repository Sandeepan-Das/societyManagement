const { collection, cluster } = require("../../Database/db")

const salary = async ()=>{
    try {
        const query = 'SELECT payment FROM `house_details` WHERE type="Worker"'
        const options = { parameters: [] }
        const result = await cluster.query(query, options)
        

        return result.rows
    } catch (error) {

        throw (error)
    }
}

const detailsWorker = async ()=>{
    try {
        const query = 'SELECT * FROM `house_details` WHERE type="Worker"'
        const options = { parameters: [] }
        const result = await cluster.query(query, options)
        

        return result.rows
    } catch (error) {

        throw (error)
    }
}

module.exports = {
    salary,detailsWorker
}