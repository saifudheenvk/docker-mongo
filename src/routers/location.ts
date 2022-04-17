import express from "express"

import locationController from "../controllers/location";


const router = express.Router();

router.get("/",locationController.getLocation)
// router.get("/add",locationController.addLocations)


export default router