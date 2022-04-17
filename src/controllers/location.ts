import {Request, Response} from "express"
import Location from "../db/location/model"
import { ILocation } from "../db/location/types"
import getLocations from "../services/locationService"


module.exports = {
    getLocation: async (req:Request, res:Response) => {
        try {
            const locations = await Location.getFilteredLocations(req.query)
            res.status(200).send(locations)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    },
    addLocations: async (req:Request, res:Response) => {
        try {
            console.log(req.body)
            const locations:Array<ILocation> = await getLocations();
            const data = await Location.insertMany(locations);
            res.status(200).send(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }
}