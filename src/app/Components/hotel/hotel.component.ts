import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/Model/Hotel';
import { HotelThingsService } from 'src/app/backended/hotel/hotel-things.service';
import { async } from 'rxjs/internal/scheduler/async';
import { Router } from '@angular/router';
import { MapService } from 'src/app/backended/map/map.service';
import { PenhubungService } from 'src/app/backended/penhubung.service';
import { ChatThingsService } from 'src/app/backended/chathings/chat-things.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

  constructor(public chat: ChatThingsService,public penghubung:PenhubungService, public mapService:MapService ,public router:Router,public hotelService: HotelThingsService) { }

  hotels: Hotel[]
  realHotel: Hotel[]
  bar:number[]
  ngOnInit() {
    this.bar = [1,2,3,4,5,6,7,8,9,0,]
    this.reset();
    this.getData()
    this.chat.listen("hotel").subscribe(e =>{
      alert(e)
    })
  }

  getData(){
    if(this.Area == null || this.Fasilitas == null || this.Kategori == null || this.Name == null || this.Rating == null){
      return;
    }
    this.hotelService.GetFillterHotel(this.Area,this.Fasilitas,this.Kategori,this.Name,this.Rating,this.MaxPrice,this.MinPrice).subscribe(
      async result =>{
        this.hotels = result
        await this.filter()
      }
    )
  }

  Provinsi: string
  Name:string
  Rating:number
  MinPrice:number
  MaxPrice:number
  Fasilitas:string
  Area:string
  Kategori: string

  filter(){
    this.realHotel = [this.hotels[0]]
    this.realHotel.pop()

    this.hotels.forEach(e =>{
      this.realHotel.push(e)
    })
    console.log(this.realHotel)
    this.sort()
   
  }

  cari(){
    this.Area=this.Provinsi;
    this.getData()
  }

  reset(){
    this.Name=""
    this.Rating=0
    this.MinPrice=0
    this.MaxPrice=0
    this.Fasilitas=""
    this.Area=""
    this.Kategori=""
    this.getData()
  }

  sortFilter:string
  sort(){
    if(this.sortFilter == "Murah"){
      this.realHotel.sort((a,b)=> a.Price - b.Price)
    }else if(this.sortFilter == "Mahal"){
      this.realHotel.sort((a,b)=> b.Price - a.Price)
    }else if(this.sortFilter == "Rating"){
      this.realHotel.sort((a,b)=> b.Count - a.Count)
    }else if(this.sortFilter == "Bintang"){
      this.realHotel.sort((a,b)=> b.Star - a.Star)
    }
  }

  gotoMap(){
    this.router.navigateByUrl("HotelMap")
  }

  gotoDetail(n: number){
    this.penghubung.CurrHotel = n;
    this.router.navigateByUrl("HotelDetail");
  }
}
