import { Component, OnInit } from '@angular/core';
import { MatTooltipModule} from '@angular/material';
import { Car } from '../../Model/Car';
import { CarThingsService } from '../../backended/car/car-things.service';
import { runInThisContext } from 'vm';
import { Router } from '@angular/router';
import { TransactionThingsService } from 'src/app/backended/transaction/transaction-things.service';
import { PenhubungService } from 'src/app/backended/penhubung.service';

@Component({
  selector: 'app-rent-page',
  templateUrl: './rent-page.component.html',
  styleUrls: ['./rent-page.component.scss']
})
export class RentPageComponent implements OnInit {

  constructor(public penghubung:PenhubungService,public trans:TransactionThingsService,public router: Router,public carService: CarThingsService) { }

  showingMore: boolean;
  changing: boolean;
  Cars: Car[];
  showCars: Car[];
  RealCars: Car[];
  /////////////////////
  Name: string;
  MinVal: number;
  MaxVal: number;
  Capacity: number;
  Brand: string;
  City: string;


  ngOnInit() {
    this.showingMore = false;
    this.changing = false;

    this.reset();
    
    this.getFiltered();
    
  }

  getFiltered(){

    this.carService.GetFilterCar(this.Name,this.MinVal,this.MaxVal,this.Capacity,this.Brand,this.City).subscribe(
      async result =>{
        this.Cars = result;
        await this.filter();
      }
    )   
  }

  filter(){
    this.showCars = [this.Cars[0]];
    this.showCars.pop();
    this.Cars.forEach(c =>{
      // if(c.Price >= this.MinVal && c.Price <= this.MaxVal){
      //   if(c.Capacity <= this.Capacity){
      //     if(this.Name == "" || this.Name == c.Name){
      //       if(this.Brand == "" || this.Brand == c.Brand){
              this.showCars.push(c);
      //       }
      //     }
      //   }
      // }
    });

    this.init();
  }

  reset(){
    this.Name="";
    this.MinVal=0;
    this.MaxVal=9000000;
    this.Capacity=6;
    this.Brand="";
    this.City="";
  }

  init(){
    //INFISCWOL
    this.RealCars = [this.showCars[0]];
    this.RealCars.pop()
    document.onscroll = function () {
      if (window.scrollY + window.innerHeight + window.innerHeight*1/5 >= document.body.scrollHeight) {
        this.addDataShow();
      }
    }.bind(this)
  }

  addDataShow(){ 
    if(this.showCars[0] != null) this.RealCars.push(this.showCars.pop());
  }

  toggle(){
    this.showingMore = !this.showingMore;
  }

  toggle2(){
    this.changing = true;
  }

  toggle3(){
    this.changing=false;
  }

  beli(c: Car){
    alert("Car Id: "+ c.Id)
    alert("Name :"+c.Name)
    alert("Brand :"+c.Brand)
    alert("Price :"+c.Price)
    this.trans.InsertTransaction(this.penghubung.CurrentUser.Id,0,0,0,c.Id,0,this.penghubung.quantity,this.penghubung.date).subscribe(async e=>{
      alert(e)
    })
    this.router.navigateByUrl("Home")
  }
}
