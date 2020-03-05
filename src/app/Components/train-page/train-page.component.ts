import { Component, OnInit } from '@angular/core';
import { MatTooltipModule} from '@angular/material';
import { TrainThingsService } from './../../backended/train/train-things.service'
import { async } from 'rxjs/internal/scheduler/async';
import { Train } from 'src/app/Model/Train';
import { runInThisContext } from 'vm';
import { Router } from '@angular/router'
import { PenhubungService } from 'src/app/backended/penhubung.service';
import { MatDialog } from '@angular/material';
import { TrainDetailComponent } from './train-detail/train-detail.component'
import { TransactionThingsService } from 'src/app/backended/transaction/transaction-things.service';
import { ChatThingsService } from 'src/app/backended/chathings/chat-things.service';

@Component({
  selector: 'app-train-page',
  templateUrl: './train-page.component.html',
  styleUrls: ['./train-page.component.scss']
})
export class TrainPageComponent implements OnInit {

  constructor(public chat:ChatThingsService,public transaction: TransactionThingsService, public dialog: MatDialog,public router: Router,public trainService: TrainThingsService,public penghubung: PenhubungService) { }
  showClass: boolean;
  showTime: boolean;
  showName: boolean;
  Class: string;
  TimeMin: number;
  TimeMax: number;
  Name: string;
  Trains: Train[];
  showTrains: Train[];
  sortBy: string;
  StartLocation: string;
  EndLocation: string;
  TrainDate: string;
  Quantity: number;

  ngOnInit() {
    this.showClass=false;
    this.showName=false;
    this.showTime=false;
    this.reset();
    this.getTrain();
    this.chat.listen("train").subscribe(e =>{
      alert(e)
    })
  }

  getTrain(){
    this.trainService.GetFilterTrain(this.Class,this.TimeMin,this.TimeMax,this.Name,this.StartLocation,this.EndLocation).subscribe(
      async result =>{
        this.Trains = result;
        await this.filter();
      }
    )
  }

  filter(){
    this.showTrains = [this.Trains[0]]
    this.showTrains.pop();

    this.Trains.forEach(t =>{
      // if(this.Class == "" || this.Class == t.Class){
      //   if(this.TimeMin <= t.StartTime && this.TimeMax >= t.EndTime){
      //     if(this.Name == "" || t.Name == this.Name){
            this.showTrains.push(t);
      //     }
      //   }
      // }
    })
    
    if(this.sortBy == "Harga terendah"){
      this.showTrains.sort((n1,n2) => n1.Price - n2.Price);
    }else if(this.sortBy == "Keberangkatan paling awal"){
      this.showTrains.sort((n1,n2) => n1.StartTime - n2.StartTime);
    }else if(this.sortBy == "Keberangkatan paling akhir"){
      this.showTrains.sort((n1,n2) => n2.StartTime - n1.StartTime);
    }else if(this.sortBy == "Kedatangan paling awal"){
      this.showTrains.sort((n1,n2) => n1.EndTime - n2.EndTime);
    }else if(this.sortBy == "Kedatangan paling akhir"){
      this.showTrains.sort((n1,n2) => n2.EndTime - n1.EndTime);
    }else if(this.sortBy == "Durasi tercepat"){
      this.showTrains.sort((n1,n2) => (n1.EndTime-n1.StartTime) - (n2.EndTime - n2.StartTime));
    }
    
  }

  gotoCheckout(id: number){
    this.showTrains.forEach(t =>{
      if(t.Id == id){
        this.penghubung.CurrentTrain=t;
      }
    })
    if(this.Quantity <= 0 ){
      alert("Quanitty must be valid");
      return;
    }
    if(this.TrainDate == null ||  this.TrainDate == ""){
      alert("date must be valid");
      return;
    }
    this.penghubung.date = this.TrainDate;
    this.penghubung.quantity = this.Quantity;
    this.router.navigateByUrl("Checkout")
  }

  gotoDetail(id: number){
    this.showTrains.forEach(t =>{
      if(t.Id == id){
        this.penghubung.CurrentTrain=t;
      }
    })
    this.dialog.open(TrainDetailComponent)
  }

  reset(){
    this.Class="";
    this.TimeMin=0;
    this.TimeMax=99.99;
    this.Name="";
    this.StartLocation="";
    this.EndLocation="";
    this.Quantity=0;
    this.TrainDate="";
  }

  toggleClass(){
    this.showClass=!this.showClass;
  }

  toggleTime(){
    this.showTime=!this.showTime;
  }

  toggleName(){
    this.showName=!this.showName;
  }
}
