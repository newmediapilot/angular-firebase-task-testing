import {Injectable} from '@angular/core';
import {LocationService} from './location.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {map, mergeMap} from 'rxjs/operators';
import {FirebaseService} from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private ActiveReminders: string = '/storage/reminders/active';
  private CompletedReminders: string = '/storage/reminders/completed';

  constructor(
    private db: AngularFireDatabase,
    private locationService: LocationService,
    private firebaseService: FirebaseService
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
    return this.firebaseService.list(this.ActiveReminders);
  }

  getCompleteReminders() {
    return this.firebaseService.list(this.CompletedReminders);
  }

  completeReminder(reminder) {
    return this.firebaseService.move(`${this.ActiveReminders}/${reminder.key}`, this.CompletedReminders, reminder.val);
  }

  uncompleteReminder(reminder) {
    return this.firebaseService.move(`${this.CompletedReminders}/${reminder.key}`, this.ActiveReminders, reminder.val);
  }

  postReminder(reminder) {
    return this.firebaseService.create(this.ActiveReminders, reminder);
  }

  createReminder(values) {
    return this.locationService.fetchLocation().pipe(
      map(location => this.amendLocation(values, location)),
      mergeMap((amendedValues) => this.postReminder(amendedValues))
    );
  }

}
