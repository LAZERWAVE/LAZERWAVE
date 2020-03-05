import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/Model/Hotel';
import { PenhubungService } from 'src/app/backended/penhubung.service';
import { MapService } from 'src/app/backended/map/map.service';
import { Router } from '@angular/router';
import { HotelThingsService } from 'src/app/backended/hotel/hotel-things.service';
import { async } from 'rxjs/internal/scheduler/async';
import { ShareButtonModule } from '@ngx-share/button';
import * as L from 'leaflet';

const iconRetinaUrl = './../../../..//assets/pointer.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {

  constructor(public penghubung:PenhubungService, public mapService:MapService ,public router:Router,public hotelService: HotelThingsService) { }
  realHotel: Hotel[]
  ngOnInit() {
    this.getData()

  }

  getData(){
    this.hotelService.GetAllHotel().subscribe(
      async result =>{
        this.realHotel = result
        await this.getClose()
      }
    )
  }

  currHotel: Hotel
  close: Hotel[]
  getClose(){
    this.realHotel.forEach(e =>{
      if(e.Id == this.penghubung.CurrHotel){
        this.currHotel = e;
      }
    })
    this.hotelService.GetClosestHotel(this.currHotel.Latitude,this.currHotel.Longitude).subscribe(
      async result=>{
        this.close = result;
        await this.initMap()
      }
    )
  }
  temp :Hotel[]
  private map;
  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    

    this.temp = [new Hotel]
    this.temp.pop()
    this.temp.push(this.currHotel)
    this.temp.push(this.close[0])
    this.temp.push(this.close[1])

    tiles.addTo(this.map);
    console.log(this.map)
    this.mapService.makeCapitalMarkers(this.map,this.temp)
  }
}
