import {Component, OnInit} from '@angular/core';
import {StoreService} from '../../service/store.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'nmp-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent {

  items = this.storeService.getIncompleteReminders();

  constructor(
    private storeService: StoreService,
    private _snackBar: MatSnackBar,
  ) {
  }

  moveItem(reminder) {
    this.storeService.completeReminder(reminder).pipe(
      tap(() => {
        console.log('moveItem');
        this._snackBar.open('Good work!', 'OK', {
          duration: 2000,
        });
      })
    ).subscribe();
  }

}
