import { iSearch } from "./SearchModel"
import {Document} from "mongoose"

/** 
 This class makes a schema compatible with Travolic third-party

 Gateway: http://api.travolic.com
*/

interface iLeg{
    origin: string
    destination: string
    departure: string
    orig_city: boolean
    dest_city: boolean
}


interface iThirdPartySearch{
    tripType: string | number
    cabinClass: string | number
    passengers: number[]
    directFlight: boolean
    nearbyAirportOne: boolean
    nearbyAirportTwo: boolean
    legs: iLeg[]
    country: string
    currency: string
    adults: number
    children: number
    infants: number
    language: string
    visitorId: string
}

type SearchObj = Document<unknown, any, iSearch> & iSearch

class ThirdPartySearch implements iThirdPartySearch{
    tripType: string
    cabinClass: string
    passengers: number[]
    directFlight: boolean = false
    nearbyAirportOne: boolean = false
    nearbyAirportTwo: boolean = false
    legs: iLeg[]
    country: string
    currency: string
    adults: number
    children: number
    infants: number
    language: string
    visitorId: string
      
    constructor(searchSchema: SearchObj){
        // every single element in searchSchema can't be null
        // simply because it can't be injected here without being verified

        this.tripType = searchSchema.tripType as unknown as string
        this.cabinClass = searchSchema.cabinClass as unknown as string
        this.country = searchSchema.country
        this.currency = searchSchema.currency
        this.legs = ThirdPartySearch.getLegs(searchSchema)
        this.language = "en"
        this.visitorId = searchSchema.visitorId
        this.passengers = [
            this.adults = searchSchema.adults, 
            this.children = searchSchema.children, 
            this.infants = searchSchema.infants
        ]
    }

    toString(): string{
        return JSON.stringify(this as iThirdPartySearch)
    }

    private static getLegs(searchSchema: SearchObj): iLeg[]{
        let legs: iLeg[] = []

        let leg1: iLeg = {
            origin: searchSchema.from,
            destination: searchSchema.to,
            departure: searchSchema.arrival,
            orig_city: true,
            dest_city: false
        }

        let leg2: iLeg = {
            origin: searchSchema.to,
            destination: searchSchema.from,
            departure: searchSchema.departure,
            orig_city: false,
            dest_city: true
        }

        switch(searchSchema.tripType as unknown as string){ // the type of interface is number but we receive a string value because of the getter we set in the mongoose validator
            case "oneway": { legs.push(leg1); break }
            case "round": { legs.push(leg1, leg2); break }
            default : throw new Error("Can't parse legs")
        }

        return legs
    }
}

export{
    ThirdPartySearch,
    iThirdPartySearch
}