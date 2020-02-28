import { Component, OnInit, ViewChild } from '@angular/core';
import { EventThingsService } from 'src/app/backended/event/event-things.service';
import { EventCard } from 'src/app/Model/EventCard';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material';



export interface EventCardInterface {
  Id: number;
  Tumbnail: string;
  Title: string;
  Price: number;
  kategori: string;
}

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss']
})
export class ManageEventComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(public eventService: EventThingsService) { }

  Events: EventCard[];
  ShowEvent: EventCard[];
  EventInterfaces: EventCardInterface[];
  dataSource: any;
  displayedColumns: string[] = ['Id', 'Tumbnail', 'Title', 'Price','kategori'];

  ngOnInit() {
   this.getData();
   this.reset();
  }


  MinVal: number;
  MaxVal: number;
  Kategori: string;

  tempInterface: EventCardInterface

  initTable(){
    let x : EventCardInterface;
    this.EventInterfaces = [x]
    this.EventInterfaces.pop()
    this.ShowEvent.forEach(e => {
      console.log(e)
      let x : EventCardInterface;
      x={
        Id: e.Id,
        Price: e.Price,
        Title: e.Title,
        Tumbnail: e.Tumbnail,
        kategori: e.Kategori,
      }
      this.EventInterfaces.push(x)
    });
    this.dataSource = new MatTableDataSource(this.EventInterfaces);
    this.dataSource.paginator = this.paginator
  }

  getData(){
    this.EventInterfaces = [null]
    this.eventService.Get3Event().subscribe(
      async result => {
        this.Events = result;
        await this.filter();
      }
    );
  }

  
  reset(){
    this.MinVal=0;
    this.MaxVal=9000000;
    this.Kategori="";
  }

  filter(){
    this.Events.sort();
    this.ShowEvent = [this.Events[0]];
    this.ShowEvent.pop();

    this.Events.forEach(e => {
      if(e.Price >= this.MinVal && e.Price <= this.MaxVal){
        if(this.Kategori=="Activity" || this.Kategori=="Attraction" || this.Kategori=="Event"){
          if(this.Kategori == e.Kategori){
              this.ShowEvent.push(e)
            }
          }else{
            this.ShowEvent.push(e)
          }
        }
    });
        
    console.log(this.ShowEvent)
    this.initTable()
  }
}
