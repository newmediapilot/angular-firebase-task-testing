import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LocationService} from './location.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private locationService: LocationService
  ) {
  }

  createReminder(values) {
    this.locationService.fetchLocation().subscribe((location) => {
      var toSave = Object.assign({}, values, {location: location});
      console.log('createReminder toSave', toSave);
    });
  }

}
