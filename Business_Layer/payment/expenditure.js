const { saveBill, fetchCurrentBill, fetchOwner, fetchTenant, pastBills, delCurrentBill,shareExpenditure,societyMonthlyBill } = require("../../Repository/index")

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
        if (req.body.type == "Owners") {
            const owners = await fetchOwner()
            totalRecipient = owners.length;
            owners.forEach(element => {
                arr.push(element.uuid)
            });

        } else if (req.body.type == "Residents") {
            const tenant = await fetchTenant()
            const owner = await fetchOwner()
            const residingOwners = owner.filter((data) => {

                return data.house_details.occupiedBy == "yes"
            })
            tenant.forEach(element => {
                arr.push(element.house_details.uuid)
            });
            residingOwners.forEach(element => {
                arr.push(element.house_details.uuid)
            });
            totalRecipient = residingOwners.length + tenant.length

        }
        const payableAmt = parseInt(req.body.total) / totalRecipient
        const del = await delCurrentBill(req.body)
        const result1 = await pastBills(req.body)
        req.body.total = String (payableAmt)
        arr.forEach(async element => {
           var res = await shareExpenditure(req.body,element) 
        });
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