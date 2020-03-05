import { Component, OnInit, ViewChild } from '@angular/core';
import { EventThingsService } from 'src/app/backended/event/event-things.service';
import { EventCard } from 'src/app/Model/EventCard';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material';
import { async } from 'rxjs/internal/scheduler/async';
import { ChatThingsService } from 'src/app/backended/chathings/chat-things.service';



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
  constructor(public chat:ChatThingsService,public eventService: EventThingsService) { }

  Events: EventCard[];
  ShowEvent: EventCard[];
  EventInterfaces: EventCardInterface[];
  dataSource: any;
  displayedColumns: string[] = ['Id', 'Tumbnail', 'Title', 'Price','kategori'];

  ngOnInit() {
   this.getData();
   this.reset();
   this.init();
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

  tets(cmd: any){
		if(cmd === 'createlink') {
			let url = prompt("Enter the link here: ", "http:\/\/");
			document.execCommand(cmd, false, url);
		} else {
			document.execCommand(cmd, false, null);
		}
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
  delId: number
  init(){
    this.insTitle=""
    this.insPrice=0
    this.insTumbnail=""
    this.insKategori=""
    this.sure=false;
    this.delId=0;
    this.upId = 0;
    this.upTitle = ""
    this.upPrice=0
    this.upTumbnail=""
    this.upKategori=""
  }

  insTitle: string
  insPrice: number
  insTumbnail: string;
  insKategori: string;
  insert(){
    this.insTitle = document.getElementById("output").innerHTML
    console.log(this.insTitle)
    if(this.insTitle == "" || this.insPrice < 1 || this.insTumbnail =="" || this.insKategori == ""){
      alert("field cannot be empty")
      return;
    }
    var temp
    this.eventService.InsertEvent(this.insKategori,this.insPrice,this.insTitle,this.insTumbnail).subscribe(
      async queryy => {
        temp = queryy
        if(temp[0] == null){
          alert("Evented hased been Rejected")
          return
        }
        alert("insert succes <3");
        await this.getData();
      }
    )
    this.chat.emit("event","new data");
    this.init();
  }
  
  sure: boolean
  delete(){
    if(this.delId <= 0){
      alert("must be filled");
      return;
    }
    this.sure=true;
  }

  yes(){
    this.eventService.DeleteEvent(this.delId).subscribe(
      async result =>{
        await this.getData();
      }
    )
    this.init();
  }

  no(){
    this.init();
  }

  upId: number;
  upTitle: string
  upPrice: number
  upTumbnail: string;
  upKategori: string;
  update(){
    if(this.upTitle == "" || this.upPrice < 1 || this.upTumbnail =="" || this.upKategori == "" || this.upId <=0){
      alert("field cannot be empty")
      return;
    }
    this.eventService.UpdateEvent(this.upId,this.upKategori,this.upPrice,this.upTitle,this.upTumbnail).subscribe(
      async result =>{
        await this.getData()
      }
    )
    this.init()
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
