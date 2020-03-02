import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { TrainThingsService } from './../../../backended/train/train-things.service'
import { Train } from '../../../Model/Train';

export interface TrainInterface {
    Id: number
    Name: string
    Class: string
    StartTime: number
    EndTime: number
    Price: number
    StartLocation: string
    EndLocation: string
}

@Component({
  selector: 'app-manage-train',
  templateUrl: './manage-train.component.html',
  styleUrls: ['./manage-train.component.scss']
})
export class ManageTrainComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(public trainService: TrainThingsService) { }

  Trains: Train[];
  ShowTrain: Train[];
  TrainInterfaces: TrainInterface[];
  dataSource: any;
  displayedColumns: string[] = ['Id', 'Name', 'Class', 'StartTime','EndTime','Price','StartLocation','EndLocation'];
  
  ngOnInit() {
   this.getData();
   this.reset();
   this.init();
  }


  TimeMin: number;
  TimeMax: number;
  Class: string;
  Name: string;

  tempInterface: TrainInterface

  initTable(){
    let x : TrainInterface;
    this.TrainInterfaces = [x]
    this.TrainInterfaces.pop()
    this.ShowTrain.forEach(e => {

      let x : TrainInterface;
      x={
        Id: e.Id,
        Name: e.Name,
        Class: e.Class,
        StartTime: e.StartTime,
        EndTime: e.EndTime,
        Price: e.Price,
        StartLocation: e.StartLocation,
        EndLocation: e.EndLocation
      }
      this.TrainInterfaces.push(x)
    });
    this.dataSource = new MatTableDataSource(this.TrainInterfaces);
    this.dataSource.paginator = this.paginator
  }

  getData(){
    this.TrainInterfaces = [null]
    this.trainService.GetAllTrain().subscribe(
      async result => {
        this.Trains = result;
        await this.filter();
      }
    );
  }
  delId: number
  init(){
    this.sure=false;
    this.delId=0;
    this.upId = 0;
    this.upPrice=0
    this.insClass=""
    this.insEndLocation=""
    this.insEndTime=99
    this.insId=0
    this.insName=""
    this.insPrice=0
    this.insStartLocation=""
    this.insStartTime=0
    
    this.upClass=""
    this.upEndLocation=""
    this.upEndTime=99
    this.upId=0
    this.upName=""
    this.upPrice=0
    this.upStartLocation=""
    this.upStartTime=0
  }


  insClass : string;
  insEndLocation: string;
  insEndTime: number;
  insId: number;
  insName: string;
  insPrice: number;
  insStartLocation: string;
  insStartTime: number;

  insert(){
    if(this.insClass == "" || this.insEndLocation == "" || this.insPrice < 0){
      alert("field cannot be empty")
      return;
    }
    this.trainService.InsertTrain(this.insName,this.insClass,this.insStartTime,this.insEndTime,this.insPrice,this.insStartLocation,this.insEndLocation).subscribe(
      async queryy => {
        alert("insert succes <3");
        await this.getData();
      }
    )
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
    this.trainService.DeleteTrain(this.delId).subscribe(
      async result =>{
        await this.getData();
      }
    )
    this.init();
  }

  no(){
    this.init();
  }

  upId:number;
  upClass : string;
  upEndLocation: string;
  upEndTime: number;
  upName: string;
  upPrice: number;
  upStartLocation: string;
  upStartTime: number;
  update(){
    if(this.upClass == "" || this.upEndLocation == "" || this.upPrice < 0){
      alert("field cannot be empty")
      return;
    }
    this.trainService.UpdateTrain(this.upId,this.upName,this.upClass,this.upStartTime,this.upEndTime,this.upPrice,this.upStartLocation,this.upEndLocation).subscribe(
      async result =>{
        await this.getData()
      }
    )
    this.init();
  }

  reset(){
    this.TimeMin=0;
    this.TimeMax=9000000;
    this.Class="";
    this.Name="";
  }

  filter(){
    this.Trains.sort();
    this.ShowTrain = [this.Trains[0]];
    this.ShowTrain.pop();

    this.ShowTrain = [this.Trains[0]]
    this.ShowTrain.pop();

    this.Trains.forEach(t =>{
      if(this.Class == "" || this.Class == t.Class){
        if(this.TimeMin <= t.StartTime && this.TimeMax >= t.EndTime){
          if(this.Name == "" || t.Name == this.Name){
            this.ShowTrain.push(t);
          }
        }
      }
    })
        
    console.log(this.ShowTrain)
    this.initTable()
  }
}
