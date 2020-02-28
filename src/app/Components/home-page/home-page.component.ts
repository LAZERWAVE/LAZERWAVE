import { Component, OnInit } from '@angular/core';
import { PenhubungService } from './../../backended/penhubung.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  selected_hotel :Boolean
  selected_car :Boolean
  selected_plane :Boolean
  
  constructor(public router: Router,public penghubung: PenhubungService) { 
    this.selected_plane = true;
  }

  ngOnInit() {
    
  }


  gotoTrain(){
    this.router.navigateByUrl("Train");
  }





  gotoEvent(){
    this.router.navigateByUrl("Event");
  }

  flight(){
    this.selected_plane = true;
    this.selected_hotel = false;
    this.selected_car = false;
  }

  hotel(){
    this.selected_plane = false;
    this.selected_hotel = true;
    this.selected_car = false;
  }

  car(){
    this.selected_plane = false;
    this.selected_hotel = false;
    this.selected_car = true;
  }
}
