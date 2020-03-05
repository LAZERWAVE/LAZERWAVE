import { Component, OnInit } from '@angular/core';
import { PenhubungService } from './../../backended/penhubung.service'
import { Router } from '@angular/router';
import { Hotel } from 'src/app/Model/Hotel';
import { HotelThingsService } from 'src/app/backended/hotel/hotel-things.service';
import { async } from 'rxjs/internal/scheduler/async';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  selected_hotel :Boolean
  selected_car :Boolean
  selected_plane :Boolean
  
  constructor(public hotelService: HotelThingsService,public router: Router,public penghubung: PenhubungService) { 
    this.selected_plane = true;
  }

  static hotels: Hotel[] 
  static Nhotels: Hotel[] 
  showHotels: Hotel[]
  bar: number[]
  ngOnInit() {
    this.bar = [1,2,3,4,5,6,7,8,9]
    this.getHotel()

  }

  getHotel(){
    this.hotelService.GetAllHotel().subscribe(
      async result =>{
        HomePageComponent.hotels = result
        await this.getLoc()
        await this.getNear()
      }
    )
  }

  getNear(){
    var a =setInterval(()=>{

      clearInterval(a)

      console.log(HomePageComponent.Nhotels)
    this.showHotels = HomePageComponent.Nhotels
    
   },5000);
    
  }


  gotoTrain(){
    this.router.navigateByUrl("Train");
  }


  getLoc(){
    navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
  }


  displayLocationInfo(position) {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
    console.log(`longitude: ${ lng } | latitude: ${ lat }`);
    HomePageComponent.hotels.sort((a,b) => Math.sqrt(Math.pow(a.Latitude-lat,2) + Math.pow(a.Longitude-lng,2)) - Math.sqrt(Math.pow(b.Latitude-lat,2) + Math.pow(b.Longitude-lng,2)))
    
    HomePageComponent.Nhotels = [new Hotel]
    HomePageComponent.Nhotels.pop()
    for(let i=0; i<8; i++){
      HomePageComponent.Nhotels.push(HomePageComponent.hotels[i])
    }
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
