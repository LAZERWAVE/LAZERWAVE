import { Component, OnInit } from '@angular/core';
import { PenhubungService } from './../../../../backended/penhubung.service'
import { EventThingsService } from './../../../../backended/event/event-things.service'
import { EventCard } from './../../../../Model/EventCard'

import { AfterViewInit} from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, tileLayer } from 'leaflet';
import { LocationThingysService } from './../../../../backended/location/location-thingys.service'
import { Location } from './../../../../Model/Location'
import { async } from 'rxjs/internal/scheduler/async';
import * as L from "leaflet";
import { runInThisContext } from 'vm';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-detail-page',
  templateUrl: './event-detail-page.component.html',
  styleUrls: ['./event-detail-page.component.scss']
})
export class EventDetailPageComponent implements OnInit {

  Id: number;
  detailEvent: EventCard[];
  location: Location[];
  quantity: number;
  date: string;
  public map



  constructor(public penghubung: PenhubungService,public eventService: EventThingsService,public locationService: LocationThingysService,public router: Router) { }

  ngOnInit() {
    var mymap = L.map('map').setView([51.505, -0.09], 13);
    this.Id=this.penghubung.EventId;
    this.locationService.GetLocationById(this.Id).subscribe(
      async result =>{
        this.location = result
        await this.getDetail()
    })
    /////////////////////////////////////////////
  }

  // options = {
  //   layers: [
  //     tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       attribution: '&copy; OpenStreetMap contributors'
  //     })
  //   ],
  //   zoom: 7,
  //   center: latLng([ 1, 1])
  // };



  getDetail(){
    this.eventService.GetEventById(this.Id).subscribe(
      async result =>{
        this.detailEvent = result
        //await this.map.panTo(new L.LatLng(this.location[0].Latitude, this.location[0].Longitude));
      }
    );
  }

  gotoHome(){
    this.router.navigateByUrl("Home");
  }

  gotoEvent(){
    this.router.navigateByUrl("Event");
  }


  private initMap(): void {
    this.map.panTo(new L.LatLng(this.location[0].Latitude, this.location[0].Longitude));
  }


  order(){
    this.penghubung.setQuatity(this.quantity);
    this.penghubung.setDate(this.date);
    this.router.navigateByUrl("EventOrder");
  }
}
