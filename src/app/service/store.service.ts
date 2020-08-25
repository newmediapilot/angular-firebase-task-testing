import {Injectable} from '@angular/core';
import {LocationService} from './location.service';
import {AngularFireDatabase, SnapshotAction} from '@angular/fire/database';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private ActiveReminders: string = '/storage/reminders/active';
  private CompletedReminders: string = '/storage/reminders/completed';

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

  private utilitySnapshotDeconstruct(snapshotChange) {
    return snapshotChange.map((item) => {
      return {
        key: item.key,
        val: item['payload'].val()
      }
    });
  }

  private list(pointer) {
    return this.db.list(pointer)
      .snapshotChanges()
      .pipe(
        map(this.utilitySnapshotDeconstruct)
      )
  }

  private create(targetPointer, val){
    return fromPromise(this.db.list(targetPointer).push(val));
  }

  private delete(targetPointer){
    return fromPromise(this.db.object(targetPointer).remove());
  }

  private move(targetPointer, destinationPointer, val) {
    return this.delete(targetPointer).pipe(
      switchMap(() => this.create(destinationPointer, val)),
    );
  }

  getActiveReminders() {
    return this.list(this.ActiveReminders);
  }

  getCompleteReminders() {
    return this.list(this.CompletedReminders);
  }

  completeReminder(reminder) {
    return this.move(`${this.ActiveReminders}/${reminder.key}`, this.CompletedReminders, reminder.val);
  }

  uncompleteReminder(reminder) {
    return this.move(`${this.CompletedReminders}/${reminder.key}`, this.ActiveReminders, reminder.val);
  }

  postReminder(reminder) {
    return fromPromise(this.db.list(this.ActiveReminders).push(reminder));
  }

  createReminder(values) {
    return this.locationService.fetchLocation().pipe(
      map(location => this.amendLocation(values, location)),
      mergeMap((amendedValues) => this.postReminder(amendedValues))
    );
  }

}
