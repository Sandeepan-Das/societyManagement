const fetch = require("node-fetch")

const resolver = {
  fetchhouseDetails: async ({key}) => {
    
    var result;
    const fetchResult = await fetch(`http://localhost:3000/api/fetchSearchQuery/${key}`)
    const jsonData = await fetchResult.json()
    
    return jsonData.data

  },

  insertOwner: async ({ input }) => {
    const rawResponse = await fetch('http://localhost:3000/api/ownerDetails', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    });
    const content = await rawResponse.json();

    
    return true
  },

  insertHouse: async ({ input }) => {
    const rawResponse = await fetch('http://localhost:3000/api/houseInfo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    });
    const content = await rawResponse.json();

    
    return true
  }
}

module.exports =
  resolver
