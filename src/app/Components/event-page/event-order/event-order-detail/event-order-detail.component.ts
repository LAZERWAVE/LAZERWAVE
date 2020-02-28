import { Component, OnInit } from '@angular/core';
import { EventCard } from './../../../../Model/EventCard';
import { PenhubungService } from './../../../../backended/penhubung.service'
import { EventThingsService } from './../../../../backended/event/event-things.service' 
import { LocationThingysService } from './../../../../backended/location/location-thingys.service'
import { async } from 'rxjs/internal/scheduler/async';
import { Location } from './../../../../Model/Location'

@Component({
  selector: 'app-event-order-detail',
  templateUrl: './event-order-detail.component.html',
  styleUrls: ['./event-order-detail.component.scss']
})
export class EventOrderDetailComponent implements OnInit {

  constructor(public locationService: LocationThingysService,public penghubung: PenhubungService,public eventService: EventThingsService) { }

  Event: EventCard[];
  EventDate: string;
  EventAddress: string;
  EventLocation: Location[];

  ngOnInit() {
    this.eventService.GetEventById(this.penghubung.EventId).subscribe(
      async result =>{
        this.Event = result
      }
    )
    this.EventDate = this.penghubung.date;
    
    this.locationService.GetLocationById(this.penghubung.EventId).subscribe(
      async result =>{
        this.EventLocation = result;
      }
    )
  }

}
