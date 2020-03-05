import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { HotelThingsService } from '../hotel/hotel-things.service';
import { Hotel } from 'src/app/Model/Hotel';
import { MapPopUpService } from './map-pop-up/map-pop-up.service';
import { circle } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  capitals: string = '/assets/data/usa-capitals.geojson';
  
  constructor(public hotelService: HotelThingsService,private popupService: MapPopUpService) {
  }

  hotels: Hotel[]

  makeCapitalMarkers(map: any,h: Hotel[]){
    this.hotelService.GetAllHotel().subscribe(
      async result =>{
        this.hotels = h
        await this.putMakers(map)
      }
    )
  }

  putMakers(map: any){
    for (const c of this.hotels) {
      const lat = c.Latitude;
      const lon = c.Longitude;
      const marker = L.marker([lon, lat]);
      marker.bindPopup(this.popupService.makeCapitalPopup(c));
      marker.addTo(map)
    }
  }
}
