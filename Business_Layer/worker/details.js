const {salary,detailsWorker} = require("../../Repository/index")

const workerPayment = async (req,res)=>{
    var sum = 0;
    try {
        const result = await salary()
        for(let val of result){
            
            const stringval = String(val.payment);
            const intVal = parseInt(stringval)
            sum = sum + intVal;
            res.status(200).send({sum})
        }
    } catch (error) {
        
    }
}

const allWorkers = async (req,res)=>{
    
    try {
        const result = await detailsWorker()
        res.send({result})
    } catch (error) {
        
    }
}

module.exports = {
    workerPayment,allWorkers
}