import {animate, style, transition, trigger} from '@angular/animations';

//TODO: make this work with router enter/leave
export const showInit = trigger('showInit', [
  transition(':enter', [
    style({opacity: 0}),
    animate(333, style({opacity: 1}))
  ])
]);
