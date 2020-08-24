import {Component, OnInit} from '@angular/core';
import {StoreService} from '../../service/store.service';

@Component({
  selector: 'nmp-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.scss']
})
export class DeletedComponent implements OnInit {

  active = this.storeService.getDeletedReminders();

  constructor(
    private storeService: StoreService
  ) {
  }

  ngOnInit() {
  }

  undeleteReminder(reminder) {
    this.storeService.undeleteReminder(reminder);
  }

}
