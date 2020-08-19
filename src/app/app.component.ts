import {Component} from '@angular/core';
import {showInit} from './animation/show-hide.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    showInit
  ]
})
export class AppComponent {
  title = 'nmp-angular-starter-kit';
}
