import { Component, OnInit } from '@angular/core';
import { MatTooltipModule} from '@angular/material';
import { Car } from '../../Model/Car';
import { CarThingsService } from '../../backended/car/car-things.service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-rent-page',
  templateUrl: './rent-page.component.html',
  styleUrls: ['./rent-page.component.scss']
})
export class RentPageComponent implements OnInit {

  constructor(public carService: CarThingsService) { }

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
    this.City="";
    this.getFiltered();
    
  }

  getFiltered(){
    this.carService.GetCarByLocation(this.City).subscribe(
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
      if(c.Price >= this.MinVal && c.Price <= this.MaxVal){
        if(c.Capacity <= this.Capacity){
          if(this.Name == "" || this.Name == c.Name){
            if(this.Brand == "" || this.Brand == c.Brand){
              this.showCars.push(c);
            }
          }
        }
      }
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

}
