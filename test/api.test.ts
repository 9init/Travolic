jest.setTimeout(15000)
jest.retryTimes(0)

import { getSearch, postSearch } from "../service/TravolicAPI"

const testBody = {
    "tripType": "oneway",
    "cabinClass": "Economy",
    "passengers": [
        1,
        0,
        0
    ],
    "directFlight": false,
    "nearbyAirportOne": false,
    "nearbyAirportTwo": false,
    "legs": [
        {
            "origin": "CAI",
            "destination": "DXB",
            "departure": "2022-05-15",
            "orig_city": true,
            "dest_city": false
        }
    ],
    "currency": "EGP",
    "country": "EG",
    "adults": 1,
    "children": 0,
    "infants": 0,
    "language": "en"
}

test("Travolic API", (done)=>{
    postSearch(testBody, (requestId, err)=>{
        if(err){
            expect(err).toBeTruthy()
            return done()
        }

        getSearch(requestId!, (responseBody, err)=>{
            if(err){
                expect(err).toBeNull()
                return done()
            }
            expect(responseBody).toBeTruthy()
            console.log(responseBody)
            done()
        })
    })
})
