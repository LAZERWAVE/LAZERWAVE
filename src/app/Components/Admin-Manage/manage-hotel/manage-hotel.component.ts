import { Component, OnInit, ViewChild } from '@angular/core';
import { Hotel } from 'src/app/Model/Hotel';
import { HotelThingsService } from 'src/app/backended/hotel/hotel-things.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ChatThingsService } from 'src/app/backended/chathings/chat-things.service';

export interface HotelInterface{
  Id :number 
	Name :string
	Price :number
	Tumbnail :string 
	Type :string
	Fasilitas :string
	Address :string
	Latitude :number
	Longitude :number
	Star :number
  Count :number
  DiscountPrice: number
  AvailableRoom: number
  Area: string
}

@Component({
  selector: 'app-manage-hotel',
  templateUrl: './manage-hotel.component.html',
  styleUrls: ['./manage-hotel.component.scss']
})
export class ManageHotelComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(public hotelService: HotelThingsService,public chat: ChatThingsService) { }
  hotels: Hotel[]
  realHotel: Hotel[]
  bar:number[]
  dataSource: any;
  displayedColumns: string[] = ['Id' ,'Name','Type','Tumbnail' ,'Fasilitas','Star','Price','Address','Latitude','Longitude','Count','DiscountPrice','AvailableRoom','Area'];

  ngOnInit() {
    this.bar = [1,2,3,4,5,6,7,8,9,0,]
    this.reset();
    this.getData()
  }

  sure: boolean

  Id:number
  Name:string
  Rating:number
  MinPrice:number
  MaxPrice:number
  Fasilitas:string
  Area:string
  Kategori:string
  insTumbnail: string
  upTumbnail:string
  insName:string
  insRating:number
  insPrice:number
  insFasilitas:string
  insArea:string
  insKategori: string
  insStar: number
  insLatitude: number
  insLongitude: number
  insCount: number
  insDiscountPrice: number
  insAvailableRoom: number
  upAvailableRoom: number
  upDiscountPrice: number
  upCount: number
  upLatitude: number
  upLongitude: number
  upStar: number
  upId:number
  upName:string
  upRating:number
  upPrice:number
  upFasilitas:string
  upArea:string
  upKategori: string
  upAddress:string
  insAddress:string
  delId:number;

  reset(){
    this.sure=false;
    this.insName=""
    this.insRating=0
    this.insPrice=0
    this.insFasilitas=""
    this.insArea=""
    this.insKategori=""
    this.insAddress=""
    this.insStar=0
    this.insLatitude=0
    this.insLongitude=0
    this.insCount=0
    this.upCount=0
    this.insTumbnail=""
    this.upTumbnail=""
    this.insDiscountPrice=0
    this.upDiscountPrice=0
    this.upLatitude=0
    this.upLongitude=0
    this.upStar=0
    this.upAddress=""
    this.upId=0;
    this.upName=""
    this.upRating=0
    this.upPrice=0
    this.upFasilitas=""
    this.upArea=""
    this.upKategori=""
    this.insAvailableRoom=0;
    this.upAvailableRoom=0;
    this.Id=0;
    this.Name=""
    this.Rating=0
    this.MinPrice=0
    this.MaxPrice=0
    this.Fasilitas=""
    this.Area=""
    this.Kategori=""

    this.delId=0;
    this.getData()
  }

  filter(){
    this.realHotel = [this.hotels[0]]
    this.realHotel.pop()

    this.hotels.forEach(e =>{
      this.realHotel.push(e)
    })
    console.log(this.realHotel)
    this.sort()
    this.initTable()
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
  HotelInterfaces: HotelInterface[]
  initTable(){
    let x : HotelInterface;
    this.HotelInterfaces = [x]
    this.HotelInterfaces.pop()

    this.realHotel.forEach(e => {
      x={
        Id : e.Id,
        Name : e.Name,
        Price : e.Price,
        Tumbnail : e.Tumbnail,
        Type : e.Type,
        Fasilitas : e.Fasilitas,
        Address : e.Address,
        Latitude : e.Latitude,
        Longitude : e.Longitude,
        Star : e.Star,
        Count : e.Count,
        DiscountPrice: e.DiscountPrice,
        AvailableRoom: e.AvailableRoom,
        Area: e.Area
      }
      this.HotelInterfaces.push(x)
    });
    console.log(this.HotelInterfaces)
    this.dataSource = new MatTableDataSource(this.HotelInterfaces);
    this.dataSource.paginator = this.paginator
  }

 insert(){
    if(this.insName == "" || this.insArea == "" || this.insPrice < 0){
      alert("field cannot be empty")
      return;
    }
    var temp
    this.hotelService.InsertHotel(this.insName,this.insPrice ,this.insTumbnail, this.insKategori,this.insFasilitas,this.insAddress,this.insLatitude,this.insLongitude,this.insStar,this.insCount,this.insDiscountPrice,this.insAvailableRoom,this.insArea).subscribe(
      async queryy => {
        temp = queryy
        if(temp[0] == null){
          alert("DAUR NO HOTEL PSSIBLE")
        }
        alert("insert succes <3");
        await this.getData();
      }
    )
    this.reset();
    this.chat.emit("hotel","new data")
  }

  delete(){
    if(this.delId <= 0){
      alert("must be filled");
      return;
    }
    this.sure=true;
  }

  yes(){
    this.hotelService.DeleteHotel(this.delId).subscribe(
      async result =>{
        await this.getData();
      }
    )
    this.reset();
  }

  no(){
    this.reset();
  }

  update(){
    if(this.upName == "" || this.upArea == "" || this.upPrice < 0){
      alert("field cannot be empty")
      return;
    }
    this.hotelService.UpdateHotel(this.upId,this.upName,this.upPrice ,this.upTumbnail, this.upKategori,this.upFasilitas,this.upAddress,this.upLatitude,this.upLongitude,this.upStar,this.upCount,this.upDiscountPrice,this.upAvailableRoom,this.upArea).subscribe(
      async result =>{
        await this.getData()
      }
    )
    this.reset();
  }
}


