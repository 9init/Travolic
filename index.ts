import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import {router as routs} from "./routes/route"

/******  Setting up environment ******/
dotenv.config()
const HOST: string = process.env.HOST || "localhost"
const PORT: number = Number(process.env.PORT) || 8181

/****** Setting up the express app ******/
const app = express()

// Required Middleware
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: true })) // Accept url encoded body
app.use(bodyParser.json()) // Accept json body


// Using predefined routes
app.use(routs)

// error handler middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) =>{
    res.status(500)
    res.render('error', { error: err })
})
// Start listening
app.listen(PORT, HOST, ()=> console.log(`listening on ${PORT}`))