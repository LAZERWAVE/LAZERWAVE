import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Options } from 'ng5-slider';
import { FormGroup, FormControl } from '@angular/forms';
import { EventCard } from './../../../Model/EventCard'
import { EventThingsService } from './../../../backended/event/event-things.service'
import { PenhubungService } from './../../../backended/penhubung.service'
import { Router } from '@angular/router';
import { LocationThingysService } from './../../../backended/location/location-thingys.service'
import { Location } from './../../../Model/Location'
import { runInThisContext } from 'vm';
import { async } from 'rxjs/internal/scheduler/async';
import { listenerCount } from 'cluster';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.scss']
})

export class EventSearchComponent implements OnInit {

  Events: EventCard[];
  ShowEvent: EventCard[];
  MinVal: number;
  MaxVal: number;
  Kategori: string;
  Country: string;
  locations: Location[];
  RealLocation: Location[];

  constructor(private cd : ChangeDetectorRef,public locationService: LocationThingysService,public eventService: EventThingsService, private router : Router,public penghubung: PenhubungService) { }

  ngOnInit() {
    this.reset();
    this.cd.detectChanges();
    this.locationService.GetAllLocation().subscribe(
      async result =>{
        this.locations = result;
        await this.getEvent();
      }
    )
    
  }

  reset(){
    this.MinVal=0;
    this.MaxVal=9000000;
    this.Kategori="";
    this.Country="";
  }

  getEvent(){
    this.eventService.GetAllEvent().subscribe(
      async result => {
        this.Events = result;
        await this.filter();
      }
    );
  }
  

  CurrEvent: EventCard;

  filter(){
    this.Events.sort();
    this.ShowEvent = [this.Events[0]];
    this.ShowEvent.pop();
    this.RealLocation = [this.locations[0]];
    this.RealLocation.pop();
    this.locations.forEach(l =>{
      this.RealLocation.push(l);
    })
    this.CurrEvent = this.Events[0];

    this.Events.forEach(e => {
      if(e.Price >= this.MinVal && e.Price <= this.MaxVal){
        if(this.Kategori=="Activity" || this.Kategori=="Attraction" || this.Kategori=="Event"){
          console.log(this.Kategori+" "+e.Kategori)
          if(this.Kategori == e.Kategori){
            if(this.Country != null && this.Country != ""){
              this.RealLocation.forEach(l =>{
                if(l.Country == this.Country && l.Id == e.Id){
                  this.ShowEvent.push(e)
                }
              })
            }else{
              this.ShowEvent.push(e);
            }
          }
        }else{
          if(this.Country != null && this.Country != ""){
            this.RealLocation.forEach(l =>{
              if(l.Country == this.Country && l.Id == e.Id){
                this.ShowEvent.push(e);
              }
            })
          }else{
            this.ShowEvent.push(e);
          }
        }
      }
      
    });
        
    console.log(this.ShowEvent)
  }

  gotoDetail(id: number){
    this.penghubung.setEventId(id);
    this.router.navigateByUrl("EventDetail");
  }
}
