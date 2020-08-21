import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrashRoutingModule } from './trash-routing.module';
import { TrashComponent } from './trash.component';


@NgModule({
  declarations: [TrashComponent],
  imports: [
    CommonModule,
    TrashRoutingModule
  ]
})
export class TrashModule { }
