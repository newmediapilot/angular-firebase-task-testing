import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../service/store.service';

@Component({
  selector: 'nmp-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {

  active = this.storeService.getCompleteReminders();

  constructor(
    private storeService: StoreService
  ) {
  }

  ngOnInit() {
  }

}
