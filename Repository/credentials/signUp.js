const { cluster } = require("../../Database/db")



signUp = async (uuid, pass, token) => {
    try {
        const query = 'UPDATE `house_details` AS hd SET hd.pass=$1, hd.tokens=array_append(ifmissing(hd.tokens, []), $2) WHERE META(hd).id = $3  '
        const options = { parameters: [pass, token, uuid] }
        const result = await cluster.query(query, options)
    } catch (error) {

        throw (error)
    }
}

logout = async (uuid, tokens) => {
    try {
        const query = 'UPDATE `house_details` AS hd SET hd.tokens= $1 WHERE META(hd).id = $2'
        const options = { parameters: [tokens, uuid] }
        const result = await cluster.query(query, options)
    } catch (error) {

        throw (error)
    }
}
login = async (uuid,token) => {
    try {
        const query = 'UPDATE `house_details` AS hd SET hd.tokens=array_append(ifmissing(hd.tokens, []), $1) WHERE META(hd).id = $2  '
        const options = { parameters: [token, uuid] }
        const result = await cluster.query(query, options)
    } catch (error) {

        throw (error)
    }
}

const fetchResidentsByEmail = async(email)=>{
    try {
        const query = 'SELECT* FROM `house_details` WHERE email=$1 AND leavingDateTime=""'
        const options = { parameters: [email] }
        const result = await cluster.query(query, options)
        return result.rows[0].house_details;
    } catch (error) {

        throw (error)
    }
} 
module.exports = {
    signUp, logout, login ,fetchResidentsByEmail
}