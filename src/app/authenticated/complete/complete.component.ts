import {Component} from '@angular/core';
import {StoreService} from '../../service/store.service';

@Component({
  selector: 'nmp-active',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent {

  items$ = this.storeService.getCompleteReminders();

  constructor(
    private storeService: StoreService
  ) {
  }

  moveItem(reminder) {
    this.storeService.uncompleteReminder(reminder).subscribe();
  }

}
