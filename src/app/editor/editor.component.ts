import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, RequiredValidator, Validators} from '@angular/forms';
import {StoreService} from '../service/store.service';

@Component({
  selector: 'nmp-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})

export class EditorComponent {

  reminderTypeGroup: FormGroup;
  reminderTextGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService) {
    this.fb = new FormBuilder();

    // reminderType form
    this.reminderTypeGroup = fb.group({
      reminderTypeSelect: fb.control('', [
        Validators.required
      ])


    });

    // reminderText form
    this.reminderTextGroup = fb.group({
      reminderText: fb.control('', [
        Validators.required
      ])
    });

  }

  setReminder() {
    var values: object = Object.assign(
      this.reminderTypeGroup.getRawValue(),
      this.reminderTextGroup.getRawValue()
    );
    this.storeService.createReminder(values);
  }

}
