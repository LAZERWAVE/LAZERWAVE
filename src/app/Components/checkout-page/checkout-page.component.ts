import { Component, OnInit } from '@angular/core';
import { PenhubungService } from 'src/app/backended/penhubung.service';
import { Train } from 'src/app/Model/Train';
import { TrainThingsService } from 'src/app/backended/train/train-things.service';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TrainDetailComponent } from './../train-page/train-detail/train-detail.component'
import { TransactionThingsService } from 'src/app/backended/transaction/transaction-things.service';


@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  constructor(public transaction: TransactionThingsService,public dialog: MatDialog,public penghubung:PenhubungService,public trainService: TrainThingsService,public router: Router) { }


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
  
  CurrentTrain: Train;
  
  options: string[];
  counter$: Observable<number>;
  count: number;

  itemBarbar:number[];

  ngOnInit() {
    if(this.penghubung.CurrentUser != null){
      this.fillAsUser();
    }
    this.inti();
    this.getTrain();
    this.options = ['+61', '+62', '+63'];
    this.itemBarbar = [1,2,3,4,5,6,7,8,9,10]
    /////////////////////////////////
    
    this.count = 600;
   

    var a = setInterval(()=>{
      this.count--;
      if(this.count == 0){
        clearInterval(a)
        alert("time's out");
        this.router.navigateByUrl("Train");
      }
    },1000)
    
  }
  order(){
    if(this.penghubung.CurrentUser == null){
      alert("login first")
      return;
    }
    this.transaction.InsertTransaction(this.penghubung.CurrentUser.Id,0,this.penghubung.CurrentTrain.Id,0,0,0,this.penghubung.quantity,this.penghubung.date).subscribe(
      async queryy => {
        alert("insert succes <3");
      }
    )
  }

  gotoDetail(){
    this.dialog.open(TrainDetailComponent)
  }



  fillAsUser(){
    this.PemesanTitle="Mr";
    this.PemesanDepan=this.penghubung.CurrentUser.FirstName;
    this.PemesanBelakang=this.penghubung.CurrentUser.LastName;
    this.PemesanTelepon=this.penghubung.CurrentUser.Phone;
    this.PemesanEmail=this.penghubung.CurrentUser.Email;
  }


  getTrain(){
    this.CurrentTrain=this.penghubung.CurrentTrain;
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
}
