// here we handle all travolic endpoints

import axios from "axios"
axios.defaults.timeout = 10000
import {iThirdPartySearch} from "../models/ThirdPartySearchModel"

const ENDPOINT_DOMAIN = "http://api.travolic.com"

/**
 * Travolic API Post endpoint returns requestID to be used later
 * 
 * The POST endpoint takes a JSON data about your trip.
 * 
 * @param postObject is a post body schema required by the API
 * @param callback is a callback function with requestId and error if present
 */

function postSearch(postObject: iThirdPartySearch, callback: (requestId: string|null, error: any)=>void){
    axios.post(ENDPOINT_DOMAIN+"/search", postObject)
    .then((res)=>callback(res.data.requestId, null))
    .catch((err)=>callback(null, err))
}


/**
 * Travolic API GET endpoint doesn't return data which is supposed to.
 * 
 * So let assume it finds the top 5 cheapest flight tickets and return them.
 * @param id is a string ID returned by postSearch function
 * @param callback is a callback function with responseBody and error if present
 */
function getSearch(id: string, callback: (responseBody: any, err: any)=>void){{
    axios.get(`${ENDPOINT_DOMAIN}/search?id=${id}`)
    .then((res)=> callback(res.data, null))
    .catch((err)=> callback(null, err))
}}

export{
    postSearch,
    getSearch
}