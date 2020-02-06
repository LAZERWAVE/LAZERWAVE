import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  selected_hotel :Boolean
  selected_car :Boolean
  selected_plane :Boolean
  
  constructor() { 
    this.selected_plane = true;
  }

  ngOnInit() {
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
