const id = require("uniqid")
const momnent = require("moment")

const {fetchOwnerById, fetchResident, saveBill, fetchCurrentBill, fetchOwner, fetchTenant, pastBills, delCurrentBill,shareExpenditure,societyMonthlyBill,fetchBlockMember } = require("../../Repository/index")

const saveCurrentExpenditure = async (req, res) => {
    try {
        const result = await saveBill(req.body)
        res.status(200).send()
    } catch (error) {

    }
}

const currentBill = async (req, res) => {
    try {
        const bill = await fetchCurrentBill()
        res.send({ bill })
    } catch (error) {

    }
}

const divideBill = async (req, res) => {
    var totalRecipient;
    var arr = [];
    try {
        req.body.billNo = id();
        req.body.issueDate = momnent().format('YYYY-MM-DD')
        
        // if (req.body.type == "Owners") {
        //     const owners = await fetchOwner()
        //     totalRecipient = owners.length;
        //     owners.forEach(element => {
        //         arr.push(element.uuid)
        //     });

        // } else if (req.body.type == "Residents") {
        //     const resident = await fetchResident()
        
        //     resident.forEach(element => {
        //         arr.push(element.house_details.uuid)
        //     });
            
        //     totalRecipient = resident.length 

        // } else 
        if(req.body.type == "Block"){
            const blockMembers = await fetchBlockMember(req.body.BlockNo)
            totalRecipient = blockMembers.length;
            blockMembers.forEach(element => {
                arr.push(element.uuid)
            });
        }
        if(req.body.type == "Floor"){
            const blockMembers = await fetchBlockMember()
            totalRecipient = blockMembers.length;
            blockMembers.forEach(element => {
                arr.push(element.uuid)
            });
        } 
        if(req.body.typePerson == "Owners"){
            console.log("C")
            var person;
            arr=arr.filter(async(element)=>{
                person = await fetchOwnerById(element)   
                if(person.type=="Owner") return person.uuid    
            })
            totalRecipient = arr.length;
            // blockMembers.forEach(element => {
            //     arr.push(element.uuid)
            // });
            console.log(arr,"B")
        }
        //  else if(req.body.type == "Floor"){
        //     const blockMembers = await fetchBlockMember()
        //     totalRecipient = blockMembers.length;
        //     blockMembers.forEach(element => {
        //         arr.push(element.uuid)
        //     });
        // } 
        // const payableAmt = parseInt(req.body.total) / totalRecipient
        
        // // const del = await delCurrentBill(req.body)
        // const result1 = await pastBills(req.body)
        
        // req.body.total = String (payableAmt)
        
        // arr.forEach(async element => {
        //    var res = await shareExpenditure(req.body,element) 
        // });
        
        res.status(200).send()
    } catch (error) {

    }
}

const monthlyBill = async (req, res) => {
    
    try {
        
        const bill = await societyMonthlyBill(req.tokenData.uuid)
        
        res.send({ bill })
    } catch (error) {

    }
}

module.exports = {
    saveCurrentExpenditure, currentBill, divideBill,monthlyBill
}