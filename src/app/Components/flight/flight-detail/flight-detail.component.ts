import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/Model/Flight';
import { FlightThingsService } from 'src/app/backended/flight/flight-things.service';
import { PenhubungService } from 'src/app/backended/penhubung.service';
import { TransactionThingsService } from 'src/app/backended/transaction/transaction-things.service';
import { async } from 'rxjs/internal/scheduler/async';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.scss']
})
export class FlightDetailComponent implements OnInit {

  constructor(public router:Router,public flightService:FlightThingsService,public penghubung: PenhubungService,public transactionService: TransactionThingsService) { }

  RealFlight: Flight[]

  ngOnInit() {
    this.getFlight()
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
  }

  getFlight(){
    this.flightService.GetAllPlane().subscribe(
      async result =>{
        this.RealFlight =result
      }
    )
  }

  step1: Boolean
  step2: Boolean
  step3: Boolean

  nextStep1(){
    this.step1 = false;
    this.step2 = true;
  }

  nextBack2(){
    this.step1 = true;
    this.step2 = false;
  }

  nextStep2(){
    this.step1 = false;
    this.step2 = true;
  }

  next2(){
    this.step2 = false;
    this.step3 = true;
  }

  backStep3(){
    this.step3 = false;
    this.step2 = true;
  }

  order(){
    if(this.penghubung.CurrentUser == null){
      alert("You must login first <3");
      return;
    }
    this.transactionService.InsertTransaction(this.penghubung.CurrentUser.Id,0,0,this.penghubung.FlightId,0,0,this.penghubung.quantity,this.penghubung.date).subscribe(
      async result =>{
        alert("Transaction Success")
        this.router.navigateByUrl("Home")
      }
    )
  }
}
