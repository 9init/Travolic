// here we handle all travolic endpoints

import axios, { AxiosError } from "axios"
import {iThirdPartySearch} from "../models/ThirdPartySearchModel"
import { TravolicApiResponse, iResponse } from "../models/ApiResponseModel"
import { response } from "express"

const ENDPOINT_DOMAIN = "https://api.travolic.com"
axios.defaults.timeout = 10000

/**
 * Return RequestID to be used later
 * 
 * The POST endpoint takes a JSON data about your trip.
 * 
 * @param postObject is a post body schema required by the API
 * @param callback is a callback function with requestId and error if present
 */
async function postSearch(postObject: iThirdPartySearch, callback?: (requestId: string|null, error: any)=>void): Promise<string|undefined>{
    try {
        let res = await axios.post(ENDPOINT_DOMAIN+"/search", postObject)
        if(callback) callback(res.data.requestId, null)
        return res.data.requestId!
    } catch (error) {
        if(!callback) throw error
        callback(null, error)
    }
}


/**
 * Get Detailed information about the available tickets.
 * 
 * @param id is a string ID returned by postSearch function
 * @param callback is a callback function with responseBody and error if present
 */
 async function getSearch(requestId: string, callback?: (responseBody: any, err: any)=>void){
    try {
        let res = await axios.get(`${ENDPOINT_DOMAIN}/search/${requestId}`)
        if(callback) callback(res.data, null)
        return res.data
    } catch (error) {
        if(!callback) throw error
        callback(null, error)
    }
}


async function fetchSearch(postObject: iThirdPartySearch, callback?: (travolicApiResponse: TravolicApiResponse | null, error: any)=>void){
    try {
        let requestId = await postSearch(postObject)
        console.log(requestId)
        let tries = 0
        while(tries<10){
            try {
                let responseBody = await getSearch(requestId!)
                if(!responseBody.completed) continue
                let travolicApiResponse = new TravolicApiResponse(responseBody)
                if(callback) callback(travolicApiResponse, null)
                return travolicApiResponse
            } catch (error) {
                if(axios.isAxiosError(error)){
                    tries++
                    continue
                }
                throw error
            }
        }
    } catch (error) {
        if(!callback) throw error
        callback(null, error)
    }
}


export{
    postSearch,
    getSearch,
    fetchSearch
}