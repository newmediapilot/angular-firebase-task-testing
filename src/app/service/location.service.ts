import {Injectable} from '@angular/core';
import {distanceTo} from 'geolocation-utils';
import {Observable} from 'rxjs';
import {map, subscribeOn} from 'rxjs/operators';

/**
 * distanceTo: https://www.npmjs.com/package/geolocation-utils#distancetofrom-location-to-location--number
 * insideCircle: https://www.npmjs.com/package/geolocation-utils#insidecirclelocation-location-center-location-radius-number--boolean
 */

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() {

  }

  fetchLocation() {
    return new Observable(observer => {
      navigator.geolocation.getCurrentPosition((location) => {
          observer.next(location);
        }, (error) => {
          observer.error(error);
        }, {
          timeout: 5000,
          enableHighAccuracy: true
        }
      );
    });
  }

}
