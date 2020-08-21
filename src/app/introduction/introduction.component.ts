import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'nmp-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
  }

  completeIntroduction() {
    this.router.navigate(['editor'], {relativeTo: this.route});
    console.log('completeIntroduction');
  }

  ngOnDestroy() {
    // TODO: create localStorage handler service for these
    //  make it return :Observable
    // localStorage.setItem('introduction', 'true');
  }

}
