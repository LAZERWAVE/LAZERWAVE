import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './../Header/header.component'
import { FooterComponent } from './../Footer/footer.component'
import { EventCard } from './../../Model/EventCard'
import { EventThingsService } from './../../backended/event/event-things.service'
import { Router } from '@angular/router';
import { PenhubungService } from './../../backended/penhubung.service'
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {
  
  Id: number;
  kategori: string;
  Events: EventCard[];
  showedEvents: EventCard[];


  constructor(public eventService: EventThingsService, private router : Router,public penghubung: PenhubungService) {
    
  }

  ngOnInit() {
    this.Id=-1;
    this.initCard();
  }
  
  initCard(){
    this.eventService.Get3Event().subscribe(
      async result => {
        this.Events = result;
        await this.duar3Event();
      }
    );
  }

  duar3Event(){
    this.showedEvents=[this.Events[0],this.Events[1],this.Events[2]];
  }
  
  jigguy(){
    alert("ZIIIIIIIIgi zaga")
  }

  semua(){
    this.kategori="semua";
  }

  activity(){
    this.kategori="activity";
  }

  gotoDetail(id: number){
    this.Id=id;
    this.penghubung.setEventId(this.Id);
    this.router.navigateByUrl("EventDetail");
  }

  attraction(){
    this.kategori="attraction";
  }

  event(){
    this.kategori="event";
  }

  search(){
    this.router.navigateByUrl("EventSearch");
  }
}
