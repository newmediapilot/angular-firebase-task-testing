import {Injectable} from '@angular/core';
import {LocationService} from './location.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {observable, Observable} from 'rxjs';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private REMINDERS_ACTIVE_POINTER: string = '/storage/reminders/active';
  private REMINDERS_COMPLETED_POINTER: string = '/storage/reminders/completed';
  private REMINDERS_DELETED_POINTER: string = '/storage/reminders/deleted';

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
    return this.db.list(this.REMINDERS_ACTIVE_POINTER).snapshotChanges()
      .pipe(map(changes =>
          changes.map(result => ({key: result.payload.key, ...result.payload.val()}))
        )
      );
  }

  getCompleteReminders() {
    return this.db.list(this.REMINDERS_COMPLETED_POINTER).snapshotChanges()
      .pipe(map(changes =>
          changes.map(result => ({key: result.payload.key, ...result.payload.val()}))
        )
      );
  }

  getDeletedReminders() {
    return this.db.list(this.REMINDERS_DELETED_POINTER).snapshotChanges()
      .pipe(map(changes =>
          changes.map(result => ({key: result.payload.key, ...result.payload.val()}))
        )
      );
  }

  softDeleteReminder(reminder) {
    console.log('softDeleteReminder', reminder);
    return fromPromise(this.db.object(this.REMINDERS_ACTIVE_POINTER + '/' + reminder).remove()).pipe(
      switchMap(() => fromPromise(this.db.list(this.REMINDERS_DELETED_POINTER).push(reminder))),
    );
  }

  undeleteReminder(reminder) {
    console.log('undeleteReminder', reminder);
    return fromPromise(this.db.object(this.REMINDERS_ACTIVE_POINTER + '/' + reminder.key).remove()).pipe(
      switchMap(() => fromPromise(this.db.list(this.REMINDERS_ACTIVE_POINTER).push(reminder))),
    );
  }

  completeReminder(reminder) {
    console.log('completeReminder', reminder);
    return fromPromise(this.db.object(this.REMINDERS_ACTIVE_POINTER + '/' + reminder.key).remove()).pipe(
      switchMap(() => fromPromise(this.db.list(this.REMINDERS_COMPLETED_POINTER).push(reminder))),
    );
  }

  uncompleteReminder(reminder) {
    console.log('uncompleteReminder', reminder);
    return fromPromise(this.db.object(this.REMINDERS_COMPLETED_POINTER + '/' + reminder.key).remove()).pipe(
      switchMap(() => fromPromise(this.db.list(this.REMINDERS_ACTIVE_POINTER).push(reminder))),
    );
  }

  postReminder(reminder) {
    console.log('postReminder', reminder);
    return fromPromise(this.db.list(this.REMINDERS_ACTIVE_POINTER).push(reminder));
  }

  createReminder(values) {
    return this.locationService.fetchLocation().pipe(
      map(location => this.amendLocation(values, location)),
      mergeMap((amendedValues) => this.postReminder(amendedValues))
    );
  }

}
