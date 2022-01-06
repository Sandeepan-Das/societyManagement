ownerSchema =
    `
    type Owner{

        name: String
        parking: String
        residents: [OwnerMember]
        vehicleList: [OwnerVehicle]
        registeredNumber: String
        roomNo: String

    }
    type OwnerMember{
        memberName: String
        phoneNumber:String
    }
    type OwnerVehicle {
        vehicleType: String
        vehicleNumber:String
    }
    type Housedata{
        hd:Owner
    }
    input OwnerInput{
        type:String
        occupiedBy:String
        name: String
        parking: String
        residents: [OwnerMemberInput]
        vehicleList: [OwnerVehicleInput]
        registeredNumber: String
        roomNo: String

    }
    input OwnerMemberInput{
        memberName: String
        phoneNumber:String
    }
    input OwnerVehicleInput {
        vehicleType: String
        vehicleNumber:String
    }


`
    ;

ownerResolver = async ({ key }) => {

    var result;
    const fetchResult = await fetch(`http://localhost:3000/api/fetchSearchQuery/${key}`)
    const jsonData = await fetchResult.json()

    return jsonData.data

}

module.exports = {
    ownerSchema, ownerResolver
}

