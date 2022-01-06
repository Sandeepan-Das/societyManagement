tenantSchema = `

    type Tenant {
        name: String
        parking: String
        residents: [OwnerMember],
        vehicleList: [OwnerVehicle],
        registeredNumber: String
        roomNo: String
    }
`