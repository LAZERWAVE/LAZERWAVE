import { Injectable } from '@angular/core';
import { User } from './../Model/user'
import { Train } from '../Model/Train';
import { HeaderComponent } from '../Components/Header/header.component';

@Injectable({
  providedIn: 'root'
})
export class PenhubungService {

  public CurrentUser: User;
  public current :String;
  public EventId :number;
  public quantity: number;
  public date: string;
  public CurrentTrain: Train;
  public registering: boolean;
  public Currency: string;
  public BlogId: number;

  constructor() { }

  public setHeader(h: HeaderComponent){
    h.Currency = this.CurrentUser.Currency;
  }

  public init(){
    this.CurrentUser = null;
    this.Currency="IDR";
  }
  
  public setCurent(current: String){
    this.current=current;
  }

  public setEventId(id: number){
    this.EventId=id;
  }

  public setQuatity(qty: number){
    this.quantity=qty;
  }

  public setDate(date: string){
    this.date=date;
  }
}
