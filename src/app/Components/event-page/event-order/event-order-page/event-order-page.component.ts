import { Component, OnInit } from '@angular/core';
import { PenhubungService } from './../../../../backended/penhubung.service'
import { EventThingsService } from './../../../../backended/event/event-things.service' 
import { LocationThingysService } from './../../../../backended/location/location-thingys.service'
import { EventCard } from './../../../../Model/EventCard';
import { MatDialog } from '@angular/material';
import { EventOrderDetailComponent } from './../event-order-detail/event-order-detail.component'
import { TransactionThingsService } from 'src/app/backended/transaction/transaction-things.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-event-order-page',
  templateUrl: './event-order-page.component.html',
  styleUrls: ['./event-order-page.component.scss']
})
export class EventOrderPageComponent implements OnInit {

  constructor(public transaction: TransactionThingsService,public dialog: MatDialog,public penghubung: PenhubungService,public event: EventThingsService,public location: LocationThingysService) { }

  TiketTitle: string;
  TiketQuantity: number;
  TiketPrice:  number;
  TiketDate: string;
  Event: EventCard[];

  PemesanTitle:string;
  PemesanDepan: string;
  PemesanTelepon: string;
  PemesanBelakang: string;
  PemesanEmail: string;

  PenumpangTitle:string;
  PenumpangDepan: string;
  PenumpangTelepon: string;
  PenumpangBelakang: string;
  PenumpangEmail: string;

  ngOnInit() {
    this.event.GetEventById(this.penghubung.EventId).subscribe(
      async result =>{
        this.Event = result
        await this.initComponent();
      }
    )

    this.inti();
  }

  order(){
    if(this.penghubung.CurrentUser == null){
      alert("login first")
      return;
    }
    this.transaction.InsertTransaction(this.penghubung.CurrentUser.Id,0,0,0,0,this.penghubung.EventId,this.penghubung.quantity,this.penghubung.date).subscribe(
      async queryy => {
        alert("insert succes <3");
      }
    )
  }

  fillAsUser(){
    this.PemesanTitle="Mr";
    this.PemesanDepan=this.penghubung.CurrentUser.FirstName;
    this.PemesanBelakang=this.penghubung.CurrentUser.LastName;
    this.PemesanTelepon=this.penghubung.CurrentUser.Phone;
    this.PemesanEmail=this.penghubung.CurrentUser.Email;
  }
  inti(){
    this.PemesanTitle = "";
    this.PemesanDepan = "";
    this.PemesanTelepon = "";
    this.PemesanBelakang = "";
    this.PemesanEmail = "";
    this.PenumpangTitle= "";
    this.PenumpangDepan= "";
    this.PenumpangTelepon= "";
    this.PenumpangBelakang= "";
    this.PenumpangEmail= "";
  }

  initComponent(){
    this.TiketTitle = this.Event[0].Title;
    this.TiketQuantity = this.penghubung.quantity
    this.TiketPrice = this.Event[0].Price;
    this.TiketDate= this.penghubung.date;
  }
  
  showDetail(){
    alert("asd")
    this.dialog.open(EventOrderDetailComponent)
  }
}
