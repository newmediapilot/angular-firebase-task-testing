import {Injectable} from '@angular/core';
import {LocationService} from './location.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {observable, Observable} from 'rxjs';
import {map, mergeMap, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private REMINDERS_ACTIVE_POINTER: string = '/storage/reminders/active';

  constructor(
    private db: AngularFireDatabase,
    private locationService: LocationService
  ) {
  }

  amendLocation(values, location) {
    return Object.assign({}, values, {
      createdAt: new Date().getTime(),
      coords: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy
      }
    });
  }

  getActiveReminders() {
    return this.db.list(this.REMINDERS_ACTIVE_POINTER).valueChanges();
  }

  postReminder(reminder) {
    return new Observable(observer => {
      this.db.list(this.REMINDERS_ACTIVE_POINTER).push(reminder).then(success => {
        observer.next(success);
      }, error => {
        observer.next(error);
      });
    });
  }

  createReminder(values) {
    return this.locationService.fetchLocation().pipe(
      map(location => this.amendLocation(values, location)),
      mergeMap((amendedValues) => this.postReminder(amendedValues))
    );
  }

}
