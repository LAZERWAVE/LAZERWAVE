import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FlightThingsService } from 'src/app/backended/flight/flight-things.service';
import { Flight } from 'src/app/Model/Flight';
import { ChatThingsService } from 'src/app/backended/chathings/chat-things.service';


export interface FlightInterface {
  Id: number
	Name: string
	Company: string
	Tumbnail: string
	StartTime: number
	EndTime: number
	StartLocation: string
	EndLocation: string
	Price: number
	Transit: number
  Fasilitas: string
  TransitTime: number
}

  

@Component({
  selector: 'app-manage-flight',
  templateUrl: './manage-flight.component.html',
  styleUrls: ['./manage-flight.component.scss']
})
export class ManageFlightComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(public flightService:FlightThingsService,public chat: ChatThingsService) { }

  ngOnInit() {
    this.reset();
    this.init();
    this.getData();
  }

  FlightInterfaces: FlightInterface[]
  Flights: Flight[] 
  RealFlight: Flight[]
  dataSource: any;
  displayedColumns: string[] = ['Id','Name','Company','Tumbnail','StartTime','EndTime','StartLocation','EndLocation','Price','Transit','Fasilitas','TransitTime'];
  

  getData(){
    this.FlightInterfaces = [null]
    this.flightService.GetAllPlane().subscribe(
      async result => {
        this.Flights = result;
        await this.filter();
      });
  }

  TransitDurasi: number
  Durasi: number
  TimeStart: number
  TimeEnd: number
  Maskapai: string
  Fasilitas: string
  Transit: number
  StartLocation: string
  EndLocation: string

  filter(){
    this.RealFlight = [this.Flights[0]]
    this.RealFlight.pop()

    this.Flights.forEach(e =>{
      if(this.TransitDurasi == 0 || e.TransitTime < this.TransitDurasi){
        if(this.Durasi == 0 || this.Durasi <= (e.EndTime - e.StartTime)){
          if(this.TimeStart == 0 || e.StartTime >= this.TimeStart){
            if(this.TimeEnd == 0 || e.EndTime <= this.TimeEnd){
              if(this.Maskapai == "" || this.Maskapai == e.Company){
                if(this.Fasilitas == "" || e.Fasilitas.includes(this.Fasilitas)){
                  if(this.Transit == 0 || this.Transit == e.Transit){
                    if(this.StartLocation == "" || this.StartLocation == e.StartLocation){
                      if(this.EndLocation == "" || this.EndLocation == e.EndLocation){
                        this.RealFlight.push(e)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
    this.initTable();
  }

  initTable(){
    let x : FlightInterface;
    this.FlightInterfaces = [x]
    this.FlightInterfaces.pop()
    this.RealFlight.forEach(e => {

      let x : FlightInterface;
      x={
        Id: e.Id,
        Name: e.Name,
        Company: e.Company,
        Tumbnail: e.Tumbnail,
        StartTime: e.StartTime,
        EndTime: e.EndTime,
        StartLocation: e.StartLocation,
        EndLocation: e.EndLocation,
        Price: e.Price,
        Transit: e.Transit,
        Fasilitas: e.Fasilitas,
        TransitTime: e.TransitTime
      }
      this.FlightInterfaces.push(x)
    });
    this.dataSource = new MatTableDataSource(this.FlightInterfaces);
    this.dataSource.paginator = this.paginator
  }

  reset(){
    this.TransitDurasi = 0
    this.Durasi = 0
    this.TimeStart = 0
    this.TimeEnd = 0
    this.Maskapai = ""
    this.Fasilitas = ""
    this.Transit = 0
    this.StartLocation = ""
    this.EndLocation = ""
  }

  insCompany : string;
  insEndLocation: string;
  insEndTime: number;
  insId: number;
  insName: string;
  insPrice: number;
  insStartLocation: string;
  insStartTime: number;
  insTransit: number;
  insFasilitas: string;
  insTransitTime: number;

  upCompany : string;
  upEndLocation: string;
  upEndTime: number;
  upId: number;
  upName: string;
  upPrice: number;
  upStartLocation: string;
  upStartTime: number;
  upTransit: number;
  upFasilitas: string;
  upTransitTime: number;
  insTumbnail: string
  upTumbnail: string

  init(){
     this.sure=false;
    // this.delId=0;
    // this.upId = 0;
    // this.upPrice=0

    this.insCompany =""
    this.insEndLocation=""
    this.insEndTime=0
    this.insId=0
    this.insName=""
    this.insPrice=0
    this.insStartLocation=""
    this.insStartTime=0
    this.insTransit=0
    this.insFasilitas=""
    this.insTransitTime=0
    this.insTumbnail=""

    this.upId=0
    this.upCompany =""
    this.upEndLocation=""
    this.upEndTime=0
    this.upId=0
    this.upName=""
    this.upPrice=0
    this.upStartLocation=""
    this.upStartTime=0
    this.upTransit=0
    this.upFasilitas=""
    this.upTransitTime=0
    this.upTumbnail=""
    
    this.delId=0;
    // this.upClass=""
    // this.upEndLocation=""
    // this.upEndTime=99
    // this.upId=0
    // this.upName=""
    // this.upPrice=0
    // this.upStartLocation=""
    // this.upStartTime=0
  }

  insert(){
    if(this.insCompany == "" || this.insEndLocation == "" || this.insPrice < 0){
      alert("field cannot be empty")
      return;
    }

    this.flightService.InsertFlight(this.insName,this.insCompany ,this.insTumbnail, this.insStartTime,this.insEndTime,this.insPrice,this.insStartLocation,this.insEndLocation,this.insTransit,this.insTransitTime,this.insFasilitas).subscribe(
      async queryy => {
        alert("insert succes <3");
        await this.getData();
      }
    )
    this.init();
    this.chat.emit("plane","new data")
  }
  delId:number
  sure: boolean
  delete(){
    if(this.delId <= 0){
      alert("must be filled");
      return;
    }
    this.sure=true;
  }

  yes(){
    this.flightService.DeletePlain(this.delId).subscribe(
      async result =>{
        await this.getData();
      }
    )
    this.init();
  }

  no(){
    this.init();
  }

  update(){
    if(this.upCompany == "" || this.upEndLocation == "" || this.upPrice < 0){
      alert("field cannot be empty")
      return;
    }
    this.flightService.UpdatePlain(this.upId,this.upName,this.upCompany ,this.upTumbnail, this.upStartTime,this.upEndTime,this.upPrice,this.upStartLocation,this.upEndLocation,this.upTransit,this.upTransitTime,this.upFasilitas).subscribe(
      async result =>{
        await this.getData()
      }
    )
    this.init();
  }
}
