/******* Travolic api GET endpoint Format to be parsed from *******/
interface iPricingOptions{
    agentName: string
    deepLink: string
    price: {
        currency: string
        amount: string
        person: number
    }
}

interface iItinerary{
    id: string
    legs: string[]
    pricingOptions: iPricingOptions[]
}

interface iTravoLeg extends iSegment{
    segments: string[]
}


/******* Formats to be parsed to *******/

// This interface are used commonly
interface iSegment{
    id: string
    origin: string
    destination: string
    departure: string
    arrival: string
    duration: number
}

interface iLeg extends iSegment{
    segments: iSegment[]
}

interface iResponse{
    origin: string
    destination: string
    legs: iLeg[]
    price: number
    currency: string
    deepLink: string
}

class TravolicApiResponse{

    private _parsedItineraries: iResponse[] = []

    public get parsedItineraries(){
        return this._parsedItineraries
    }

    public async getCheapestFiveItineraries(): Promise<iResponse[]>{
        let sortedItin = this.parsedItineraries.sort((a, b) => a.price - b.price)
        return sortedItin.slice(0, 5)
    }


    private responseBody: any
    /**
     * Parse Travolic GET end-point's data to a usable format
     * 
     * @param responseBody JSON data returned from Travolic GET end-point
     */
    constructor(responseBody: any){
        this.responseBody = responseBody
        this._parsedItineraries = this.parse()
    }

    
    private parse(): iResponse[]{
        let itineraries: {[key: string]: iItinerary} = this.responseBody["itineraries"]
        let parsedItineraries: iResponse[] = []

        for(let key in itineraries){
            let lowestPrice = this.parseLowestPriceItin(itineraries[key].pricingOptions)
            let legs = this.parseLegs(itineraries[key].legs)

            // Initialize the itinerary
            let itinerary: iResponse = {
                origin: legs[0].origin,
                destination: legs[0].destination,
                legs: legs,
                price: lowestPrice.price.person,
                currency: lowestPrice.price.currency,
                deepLink: lowestPrice.deepLink
            }

            parsedItineraries.push(itinerary)
        }

        return parsedItineraries
    }

    private parseLowestPriceItin(pricingOptions: iPricingOptions[]): iPricingOptions{
        let lowest = pricingOptions[0]
        pricingOptions.forEach(option => {
            if(option.price.person < lowest.price.person)
                lowest = option
        })
        return lowest
    }

    private parseLegs(legs: string[]): iLeg[]{
        let parsedLegs: iLeg[] = []
        legs.forEach(leg => {
            let travoLeg: iTravoLeg = this.responseBody.legs[leg]
            let parsedLeg: iLeg = {
                id : travoLeg.id,
                origin : travoLeg.origin,
                destination : travoLeg.destination,
                departure : travoLeg.departure,
                arrival : travoLeg.arrival,
                duration : travoLeg.duration,
                segments : this.parseSegments(travoLeg.segments)
            }
            parsedLegs.push(parsedLeg)
        })
        return parsedLegs
    }

    private parseSegments(segments: string[]): iSegment[]{
        let parsedSegments: iSegment[] = []
        segments.forEach(segment => {
            parsedSegments.push(this.responseBody.segments[segment])
        })
        return parsedSegments
    }
}

export{
    TravolicApiResponse,
    iResponse,
    iSegment,
    iLeg
}