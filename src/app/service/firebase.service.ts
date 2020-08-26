import {Injectable} from '@angular/core';
import {map, switchMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) {
  }

  private static utilitySnapshotDeconstruct(snapshotChange) {
    return snapshotChange.map((item) => {
      return {
        key: item.key,
        val: item['payload'].val()
      };
    });
  }

  list(pointer) {
    return this.db.list(pointer)
      .snapshotChanges()
      .pipe(
        map(FirebaseService.utilitySnapshotDeconstruct)
      )
  }

  create(targetPointer, val) {
    return fromPromise(this.db.list(targetPointer).push(val));
  }

  delete(targetPointer) {
    return fromPromise(this.db.object(targetPointer).remove());
  }

  move(targetPointer, destinationPointer, val) {
    return this.delete(targetPointer).pipe(
      switchMap(() => this.create(destinationPointer, val)),
    );
  }
}
