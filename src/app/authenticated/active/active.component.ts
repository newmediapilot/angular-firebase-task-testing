import {Component} from '@angular/core';
import {StoreService} from '../../service/store.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'nmp-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent {

  items$:Observable<{key:string, val:object}> = this.storeService.getIncompleteReminders();

  constructor(
    private storeService: StoreService
  ) {
  }

  moveItem(reminder) {
    this.storeService.completeReminder(reminder).subscribe();
  }

}
