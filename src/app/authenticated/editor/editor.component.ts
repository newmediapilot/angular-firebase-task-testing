import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, RequiredValidator, Validators} from '@angular/forms';
import {StoreService} from '../../service/store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatHorizontalStepper} from '@angular/material/stepper';

@Component({
  selector: 'nmp-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})

export class EditorComponent {

  @ViewChild('editorStepper', {static: true}) editorStepper: MatHorizontalStepper;

  reminderTypeGroup: FormGroup;
  reminderTextGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
    this.storeService.saveReminder(values).subscribe((success) => {
      this.router.navigate(['active'],{relativeTo: this.route.parent})
    });
  }

}
