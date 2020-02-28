import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-going-hotel',
  templateUrl: './going-hotel.component.html',
  styleUrls: ['./going-hotel.component.scss']
})
export class GoingHotelComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  gotoHotel(){
    this.router.navigateByUrl("Hotel");
  }
}
