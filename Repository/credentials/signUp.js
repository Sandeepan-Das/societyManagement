const { cluster } = require("../../Database/db")



signUpResident = async (uuid, pass, token) => {
    try {
        const query = 'UPDATE `house_details` AS hd SET hd.pass=$1, hd.tokens=array_append(ifmissing(hd.tokens, []), $2) WHERE hd.uuid = $3  '
        const options = { parameters: [pass, token, uuid] }
        const result = await cluster.query(query, options)
    } catch (error) {
        console.log(error)
        throw (error)
    }
}


module.exports = {
    signUpResident
}