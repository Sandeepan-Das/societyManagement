const { buildSchema } = require("graphql")
const { ownerSchema } = require("./house/owner")
const { houseInfoSchema } = require("./house/house_info")

const schema = `
    ${ownerSchema}
    ${houseInfoSchema}
    type Query{
        fetchhouseDetails(key: String): [Housedata]
    }
    type Mutation{
        insertOwner(input: OwnerInput):Boolean
        insertHouse(input: HouseInfoInput):Boolean
    }

`

module.exports = {
    schema: buildSchema(schema)
}
