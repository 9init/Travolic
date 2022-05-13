import express from "express"
import {Search} from "../models/SearchModel"
import {ThirdPartySearch} from "../models/ThirdPartySearchModel"
import { getSearch, postSearch } from "../service/TravolicAPI";

async function searchPost(req: express.Request, res: express.Response){
    // Validate request body
    let validatedParams = new Search(req.body)
    validatedParams.validate((err)=>{
        if(err) return res.status(403).json(err)
        let thirdPartySearch = new ThirdPartySearch(validatedParams)

        // Calling the endpoints
        postSearch(thirdPartySearch, (requestId, err)=>{
            if(err) return res.sendStatus(500)
            getSearch(requestId!, (responseBody, err)=>{{
                if(err) return res.status(500).json(err)
                res.json(responseBody)
            }})
        })
    })
}

export{
    searchPost
}