import {Component, OnInit} from '@angular/core';
import {StoreService} from '../../service/store.service';

@Component({
  selector: 'nmp-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {

  active = this.storeService.getActiveReminders();

  constructor(
    private storeService: StoreService
  ) {
  }

  ngOnInit() {
  }

  completeItem(reminder) {
    this.storeService.completeReminder(reminder).subscribe(() => {
      console.log('active.component completeItem');
    })
  }

  deleteItem(reminder) {
    this.storeService.softDeleteReminder(reminder).subscribe(() => {
      console.log('active.component deleteItem');
    })
  }

}
