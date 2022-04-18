import express, {Request,Response,Application} from 'express';

import { connect } from "./db/database";
import locationRouter from "./routers/location";
import cors from 'cors';
import morgan from "morgan";

const app:Application = express();


app.use(cors())
app.use(express.json())
app.use(morgan("dev"));
app.use("/locations",locationRouter)


app.get("/", (req:Request, res:Response):void => {
    res.send("Just for horror")
  });

  //connect with mong
connect();

const server = app.listen(process.env.PORT, ():void => {
    console.log('server is on port ' + process.env.PORT)
})
export default server