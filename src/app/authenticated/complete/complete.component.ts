import {Component, OnInit} from '@angular/core';
import {StoreService} from '../../service/store.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'nmp-active',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent {

  items$ = this.storeService.getCompleteReminders();

  constructor(
    private storeService: StoreService,
    private _snackBar: MatSnackBar,
  ) {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open('Reminder activated', action, {
      duration: 2000,
    });
  }

  moveItem(reminder) {
    this.storeService.uncompleteReminder(reminder).pipe(
      tap(() => {
        console.log('moveItem');
        this._snackBar.open('Let\'s go!', 'OK', {
          duration: 2000,
        });
      })
    ).subscribe();
  }

}
