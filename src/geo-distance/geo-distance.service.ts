import { Injectable } from '@nestjs/common';
import { ICoordinates } from './interface/coordinates.interface';

@Injectable()
export class GeoDistanceService {
  distanceBetweenCoordinates(coordinates: ICoordinates) {
    let { lon1, lon2, lat1, lat2 } = coordinates;
    // degrees to radians.
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;
    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
    let c = 2 * Math.asin(Math.sqrt(a));
    // Radius of earth in kilometers.
    const radiusInKm = 6371;
    //Radius of earth in miles
    const radiusInMi = 3956;
    const distance = `Distasnce between two coordinates is \n ${
      c * radiusInKm
    } KMs \n ${c * radiusInMi} Miles`;
    // calculate the result
    return distance;
  }
}
