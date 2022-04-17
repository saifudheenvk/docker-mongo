import { model } from "mongoose";
import { ILocationDocument, ILocationModel } from "./types";
import LocationSchema from "./schema";

const Location: ILocationModel = model<ILocationDocument, ILocationModel>(
  "location",
  LocationSchema
);
export default Location;