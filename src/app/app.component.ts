import {Component} from '@angular/core';
import {showHide} from './animation/app.component.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    showHide
  ]
})
export class AppComponent {
  title = 'nmp-angular-starter-kit';
}
