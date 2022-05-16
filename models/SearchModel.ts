import {Schema, Model, model} from "mongoose"
import {v4 as uuid} from "uuid"

// Search params schema
// We are using mongoose schema for validations nothing else

interface iSearch{
    from: string
    to: string
    departure: string
    arrival: string
    country: string
    currency: string
    tripType: number
    cabinClass: number
    adults: number
    children: number
    infants: number
    visitorId: string
}


const SearchSchema = new Schema<iSearch>({
    from: {type: String, set: (v: string)=>v.toUpperCase(), required: true, validate: {validator: (v: string)=> /[A-Za-z]{3}/.test(v)}},
    to: {type: String, set: (v: string)=>v.toUpperCase(), required: true, validate: {validator: (v: string)=> /[A-Za-z]{3}/.test(v)}},
    departure: {type: String, required: true, validate: {validator: (v: string)=> /\d{4}-\d{2}-\d{2}/.test(v)}},
    arrival: {type: String, required: true, validate: {validator: (v: string)=> /\d{4}-\d{2}-\d{2}/.test(v)}},
    country: {type: String, set: (v: string)=>v.toUpperCase(), required: true, validate: {validator: (v: string)=> /[A-Za-z]{2}/.test(v)}},
    currency: {type: String, set: (v: string)=>v.toUpperCase(), required: true, validate: {validator: (v: string)=> /[A-Za-z]{2}/.test(v)}},
    tripType: {type: Number, required: true, enum: [1, 2], get: (v: number)=>["oneway", "round"][v-1]},
    cabinClass: {type: Number, required: true, enum: [1, 2, 3], get: (v: number)=>["Economy", "Business", "First"][v-1]},
    adults: {type: Number, required: true},
    children: {type: Number, required: true},
    infants: {type: Number, required: true},
    visitorId: {type: String, required: false, default: uuid(), validate: {validator: (v: string)=> /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(v)}}
})

const Search: Model<iSearch> = model<iSearch>("Search", SearchSchema)

export{
    Search,
    iSearch
}