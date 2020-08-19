import {animate, animation, state, style, transition, trigger} from '@angular/animations';

export const showHide = trigger('showHide', [
  transition(':enter', [
    style({opacity: 0}),
    animate(333, style({opacity: 1}))
  ])
]);
