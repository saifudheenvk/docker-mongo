import express from "express"

const locationController = require("../controllers/location")


const router = express.Router();

router.get("/",locationController.getLocation)
// router.get("/add",locationController.addLocations)


module.exports=router