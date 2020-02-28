import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-going-car',
  templateUrl: './going-car.component.html',
  styleUrls: ['./going-car.component.scss']
})
export class GoingCarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  gotoCar(){
    this.router.navigateByUrl("CarRent");
  }
}
