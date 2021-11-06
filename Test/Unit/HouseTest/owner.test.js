const owner = require("../../../Business_Layer/house/owner")


describe("House Owner APIs",()=>{
    it("Should have a function to insert Resident",()=>{
        expect(typeof owner.residentDetails).toBe("function");
    })
})