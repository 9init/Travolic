import {Router} from "express"


/*******Setting up routs***********/
const router = Router()

// placing the handlers
import {searchPost} from "./search-handler"

router.post("/search", searchPost)

export{ router }