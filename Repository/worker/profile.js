const { collection, cluster } = require("../../Database/db")

const insertWorker = async (data) => {
  
    const key = `${data.uuid}`

    try {
        const result = await collection.upsert(key, data)

    } catch (error) {
        throw (error)
    }
}

const fetchWorker = async ()=>{
    try {
        const query = 'SELECT META().id FROM `house_details` WHERE type="Worker"'
        const options = { parameters: [] }
        const result = await cluster.query(query, options)
        console.log(result.rows)

        return result.rows
        console.log
    } catch (error) {

        throw (error)
    }
}
module.exports = {
    insertWorker,fetchWorker
}