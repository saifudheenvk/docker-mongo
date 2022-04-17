import { Document, Model } from "mongoose";

export interface ILocation {
    name: string;
    latitude: number
    longitude: number
    population: number
}
export interface ILocationDocument extends ILocation, Document {
}


export interface ILocationModel extends Model<ILocationDocument> {
    getFilteredLocations: (this:ILocationModel,params:any)=> Promise<Array<any>>;
}