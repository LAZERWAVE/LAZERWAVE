import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from 'src/app/backended/map/map.service';
import { Hotel } from 'src/app/Model/Hotel';
import { Router } from '@angular/router';
import { HotelThingsService } from 'src/app/backended/hotel/hotel-things.service';
import { PenhubungService } from 'src/app/backended/penhubung.service';


  const iconRetinaUrl = './../../../..//assets/pointer.png';
  const iconUrl = 'assets/marker-icon.png';
  const shadowUrl = 'assets/marker-shadow.png';
  const iconDefault = L.icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });
  L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-hotel-map',
  templateUrl: './hotel-map.component.html',
  styleUrls: ['./hotel-map.component.scss']
})
export class HotelMapComponent implements OnInit,AfterViewInit  {

  constructor(public penghubung:PenhubungService,public maSrevice:MapService,public mapService:MapService ,public router:Router,public hotelService: HotelThingsService) { }

  ngOnInit() {
    this.bar = [1,2,3,4,5,6,7,8,9,0,]
    this.reset();
    this.getData();
  }
  ngAfterViewInit(): void {
    this.initMap()
  }


  private map;
  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    console.log(this.map)
    this.maSrevice.makeCapitalMarkers(this.map,this.realHotel)
  }

  /////////////////////////////////////
  hotels: Hotel[]
  realHotel: Hotel[]
  bar:number[]


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
    if(this.map != undefined)this.map.remove()
    this.initMap()
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

  list(){
    this.router.navigateByUrl("Hotel")
  }
  
  gotoDetail(n: number){
    this.penghubung.CurrHotel = n;
    this.router.navigateByUrl("HotelDetail");
  }
}
