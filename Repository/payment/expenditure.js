const { collection, cluster } = require("../../Database/db")

const saveBill = async (billDetails) => {
    try {
        console.log(billDetails)
        // const query = 'UPDATE `house_details` as hd SET hd.currentBill=$1 WHERE type="Admin"'
        // const options = { parameters: [billDetails] }
        // const result = await cluster.query(query, options)
    } catch (error) {

        throw (error)
    }
}

const fetchCurrentBill = async ()=>{
    try {
        const query = 'SELECT currentBill FROM `house_details` WHERE type="Admin"'
        const options = { parameters: [] }
        const result = await cluster.query(query, options)
        
        return result.rows
    } catch (error) {
        
    }
}

const pastBills = async (data)=>{
    try {
        const query = 'UPDATE `house_details` AS hd SET hd.pastBills=array_append(ifmissing(hd.pastBills, []), $1) WHERE type="Admin"  '
        const options = { parameters: [data] }
        const result = await cluster.query(query, options)
    } catch (error) {

        throw (error)
    }
}

const delCurrentBill = async (data)=>{
    try {
        const query = 'DELETE FROM `house_details` WHERE currentBill=$1'
        const options = { parameters: [data] }
        const result = await cluster.query(query, options)
        
        return result.rows
    } catch (error) {
        
    }
}

const shareExpenditure = async (data,uuid)=>{
    try {

        query = 'UPDATE `house_details` AS hd SET hd.payableSocietyBill=$1 WHERE META(hd).id=$2'
        options = { parameters: [data,uuid] }
        const result2 = await cluster.query(query, options)
    } catch (error) {

        throw (error)
    }    
}

const societyMonthlyBill = async (uuid)=>{
    try {

        query = 'SELECT payableSocietyBill FROM `house_details` WHERE uuid=$1'
        options = { parameters: [uuid] }
        const result = await cluster.query(query, options)
        
        return result.rows
    } catch (error) {

        throw (error)
    }    
}
module.exports = {
    saveBill,fetchCurrentBill,pastBills,delCurrentBill,shareExpenditure,societyMonthlyBill
}