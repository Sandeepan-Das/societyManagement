const houseInfoSchema = `  
    type  HouseInfo  {
        block: String,
        roomNo: String,
        houseType: HouseType
    }
    
    type HouseType {
        balcony: String
        bathrooms: String
        floors: String
        rooms: String
        type: String
    }
    
    input HouseTypeInput {
        balcony: String
        bathrooms: String
        floors: String
        rooms: String
        type: String
    }
    input  HouseInfoInput  {
        block: String,
        roomNo: String,
        houseType: HouseTypeInput
    }
`

module.exports = {
    houseInfoSchema
}