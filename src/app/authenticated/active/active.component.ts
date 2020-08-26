import {Component, OnInit} from '@angular/core';
import {StoreService} from '../../service/store.service';

@Component({
  selector: 'nmp-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent {

  items = this.storeService.getIncompleteReminders();

  constructor(
    private storeService: StoreService
  ) {
  }

  moveItem(reminder) {
    this.storeService.completeReminder(reminder).subscribe();
  }

}
