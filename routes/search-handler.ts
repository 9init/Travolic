import express from "express"
import {Search} from "../models/SearchModel"
import {ThirdPartySearch} from "../models/ThirdPartySearchModel"
import { fetchSearch } from "../service/TravolicAPI";

async function searchPost(req: express.Request, res: express.Response){
    // Validate request body
    if(req.body.tripType == 1 && req.body.departure) req.body.arrival = req.body.departure
    let validatedParams = new Search(req.body)

    validatedParams.validate((err)=>{
        if(err) return res.status(403).json(err)
        let thirdPartySearch = new ThirdPartySearch(validatedParams)

        // Calling the endpoints
        fetchSearch(thirdPartySearch, (travolicApiResponse, err)=>{
            if(err) return res.status(500).json(err)
            travolicApiResponse!.getCheapestFiveItineraries()
            .then(tickets => res.json({tickets: tickets}))
        })
    })
}

export{
    searchPost
}