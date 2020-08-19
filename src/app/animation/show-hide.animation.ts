import {animate, style, transition, trigger} from '@angular/animations';

export const showInit = trigger('showInit', [
  transition(':enter', [
    style({opacity: 0}),
    animate(333, style({opacity: 1}))
  ])
]);
