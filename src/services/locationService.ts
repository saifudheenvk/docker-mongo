import { ILocation } from "../db/location/types";
var fs = require('fs');

const getLocations = async (): Promise<Array<ILocation>> => {
    const rows: Array<string> = fs.readFileSync('resources/cities_canada-usa.csv',
        { encoding: 'utf8', flag: 'r' }).split("\n");
    var csvData: Array<ILocation> = rows.slice(1).map((row: string, index: number) => {
        let valuesRegExp = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/g;
        var values = row.split(valuesRegExp);
        if (!values[1]) {
            values = row.split("\t");
        }
        if(isNaN(Number(values[5]))){
            console.log(values,index)
        }
        return {
            name: values[1],
            latitude: Number(values[4]),
            longitude: Number(values[5]),
            population: Number(values[14])
        }
    })
    return csvData
}

export default getLocations