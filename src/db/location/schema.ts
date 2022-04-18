import * as Mongoose from "mongoose";
import { ILocationModel, ILocationDocument } from "./types";



const LocationSchema = new Mongoose.Schema<ILocationDocument, ILocationModel>({
    name: String,
    latitude: Number,
    longitude: Number,
    population: Number
})

LocationSchema.statics.getFilteredLocations = async function (this: ILocationModel, params: { q: string, radius: number, longitude: number, latitude: number, sort: string }) {
    const query = this.aggregate().match({ name: { $regex: params.q || "" } })
    if (params.latitude && params.longitude) {
        query.addFields({
            tlon: Number(params.longitude),
            tlat: Number(params.latitude),
            trad: Number(params.radius),
        })
        query.addFields({
            distance: {
                $function: {
                    body: function (latitude: number, tlat: number, longitude: number, tlon: number) {
                        return Math.sqrt(Math.pow(latitude - tlat, 2) + Math.pow(longitude - tlon, 2))
                    },
                    args: ["$latitude", "$tlat", "$longitude", "$tlon"],
                    lang: "js"
                }
            },
        });
    }
    if (params.radius) {
        query.match({$expr:{$gt:["$distance","$trad"]}})
    }
    if (params.sort) {
        query.sort(params.sort)
    }
    query.project({
        tlon:0,
        tlat:0,
        trad:0
    })
    const data = await query.exec();
    return data;
}

export default LocationSchema