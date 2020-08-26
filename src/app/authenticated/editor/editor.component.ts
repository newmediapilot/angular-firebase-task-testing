import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, RequiredValidator, Validators} from '@angular/forms';
import {StoreService} from '../../service/store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatHorizontalStepper} from '@angular/material/stepper';

@Component({
  selector: 'nmp-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})

export class EditorComponent implements AfterContentInit {

  @ViewChild('reminderTextInput', {static: true}) reminderTextEl;

  reminderGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private storeService: StoreService) {
    this.fb = new FormBuilder();

    this.reminderGroup = fb.group({
      reminderTypeSelect: fb.control('', [
        Validators.required
      ]),
      reminderText: fb.control('', [
        Validators.required
      ])
    });

  }

  ngAfterContentInit() {
    let el: HTMLInputElement = this.reminderTextEl.nativeElement;
    setTimeout(() => {
      el.focus();
    }, 222);
  }

  setReminder() {
    var values = Object.assign(
      this.reminderGroup.getRawValue()
    );
    this.storeService.saveReminder(values).subscribe((success) => {
      this.router.navigate(['active'], {relativeTo: this.route.parent})
    });
  }

}
