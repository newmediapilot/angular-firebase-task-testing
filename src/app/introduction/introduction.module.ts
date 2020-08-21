import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IntroductionComponent} from './introduction.component';
import {AngularMaterialModule} from '../vendor/angular-material.module';


@NgModule({
  declarations: [IntroductionComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class IntroductionModule {
}
