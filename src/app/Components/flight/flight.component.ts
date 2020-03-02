import { Component, OnInit } from '@angular/core';
import { FlightThingsService } from 'src/app/backended/flight/flight-things.service';
import { Flight } from 'src/app/Model/Flight';
import { async } from 'rxjs/internal/scheduler/async';
import { ChatThingsService } from 'src/app/backended/chathings/chat-things.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {

  constructor(public flightService: FlightThingsService,public chat: ChatThingsService) { }

  Flights: Flight[]
  showH: boolean[]
  showT: boolean[]
  Quantity: number;

  ////////////
  showTransitDurasi:boolean
  showDurasi:boolean
  showTime:boolean
  showMaskapai:boolean
  showFasilitas:boolean
  showTransit:boolean
  StartLocation: string
  EndLocation: string

  ngOnInit() {
    this.getData()
    this.Quantity=0
    this.reset()
    this.chat.listen("plane").subscribe(e=>{
      alert(e)
    })
  }

  getData(){
    this.flightService.GetAllPlane().subscribe(
      async result =>{
        this.Flights = result
        await this.initShow()
      }
    )
  }

  RealFlight: Flight[]

  initShow(){
    
    this.filter()
    this.showH = [false]
    this.showH.pop()
    this.showT = [false]
    this.showT.pop()
    this.RealFlight.forEach(e =>{
      this.showH.push(false)
      this.showT.push(false)
    })
  }

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
  }


  showTerbang(id: number){
    this.showT[id-1] =!this.showT[id-1]
    this.showH[id-1] = false;
    
  }

  showHarga(id: number){
    this.showH[id-1] =!this.showH[id-1]
    this.showT[id-1] = false;
  }


  TransitDurasi: number
  Durasi: number
  TimeStart: number
  TimeEnd: number
  Maskapai: string
  Fasilitas: string
  Transit: number

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

  toggleShowTransitDurasi(){
    this.showTransitDurasi=!this.showTransitDurasi
  }
  toggleShowDurasi(){
    this.showDurasi=!this.showDurasi
  }
  toggleShowTime(){
    this.showTime=!this.showTime
  }
  toggleShowMaskapai(){
    this.showMaskapai=!this.showMaskapai
  }
  toggleShowFasilitas(){
    this.showFasilitas=!this.showFasilitas
  }
  toggleShowTransit(){
    this.showTransit=!this.showTransit
  }
}
