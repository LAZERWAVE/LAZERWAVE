import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-going-plane',
  templateUrl: './going-plane.component.html',
  styleUrls: ['./going-plane.component.scss']
})
export class GoingPlaneComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  gotoFlight(){
    this.router.navigateByUrl("Flight");
  }


}
