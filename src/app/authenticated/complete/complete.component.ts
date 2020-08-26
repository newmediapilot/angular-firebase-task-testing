import {Component} from '@angular/core';
import {StoreService} from '../../service/store.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'nmp-active',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent {

  items$:Observable<{key:string, val:object}> = this.storeService.getCompleteReminders();

  constructor(
    private storeService: StoreService
  ) {
  }

  moveItem(reminder) {
    this.storeService.uncompleteReminder(reminder).subscribe();
  }

}
