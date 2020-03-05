import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PenhubungService } from './../../backended/penhubung.service'
import { Router } from '@angular/router'
import { LoginThingsService } from './../../backended/login/login-things.service'
import { Login3Component } from '../Login/login3/login3.component';
import { Login2Component } from '../Login/login2/login2.component';
import { UserThingsService } from 'src/app/backended/user/user-things.service';
import { async } from 'rxjs/internal/scheduler/async';
import { ChatThingsService } from 'src/app/backended/chathings/chat-things.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  state: string;
  FirstLetter: string;
  Languague: string;
  Currency: string;

  constructor(public chat:ChatThingsService,public userService: UserThingsService,public loginService: LoginThingsService,public dialog: MatDialog,public penghubung: PenhubungService,private router: Router) { }

  test(){
    this.penghubung.Currency=this.Currency;
  }

  ngOnInit() {
    this.state="";
    this.Languague="Indonesia";
    this.Currency="IDR";

    this.chat.listen("login").subscribe(e=>{
      this.Currency = this.penghubung.CurrentUser.Currency
      this.Languague = this.penghubung.CurrentUser.Languague
    })

  }

  gotoRent(){
    this.router.navigateByUrl("CarRent");
  }

  gotoHiburan(){
    if(this.penghubung.CurrentUser != null && this.penghubung.CurrentUser.FirstName == "admin"){
      this.router.navigateByUrl("ManageEvent")
      return;
    }
    this.state="hiburan";
    this.penghubung.setCurent(this.state);
    this.router.navigateByUrl("Event")
  }

  gotoHome(){
    this.state = "home";
    this.penghubung.setCurent(this.state);
    this.router.navigateByUrl("Home")
  }

  gotoTrain(){
    if(this.penghubung.CurrentUser != null && this.penghubung.CurrentUser.FirstName == "admin"){
      this.router.navigateByUrl("ManageTrain")
      return;
    }
    this.router.navigateByUrl("Train");
  }

  openDialogLogin() {
    this.dialog.open(Login2Component)
  }

  gotoAccount(){
    this.router.navigateByUrl("Account")
  }

  gotoPromo(){
    this.router.navigateByUrl("Promo");
  }

  gotoFlight(){
    if(this.penghubung.CurrentUser != null && this.penghubung.CurrentUser.FirstName == "admin"){
      this.router.navigateByUrl("ManageFlight")
      return;
    }
    this.router.navigateByUrl("Flight");
  }

  gotoHotel(){
    if(this.penghubung.CurrentUser != null && this.penghubung.CurrentUser.FirstName == "admin"){
      this.router.navigateByUrl("ManageHotel")
      return;
    }
    this.router.navigateByUrl("Hotel");
  }
   
  setLanguague(){
    if(this.penghubung.CurrentUser == null){
      return;
    }
    this.userService.UpdateEvent(this.penghubung.CurrentUser.Id,this.Languague).subscribe(
      async result =>{
        await this.bar()
      }
    )
  }

  bar(){
    console.log(this.penghubung.CurrentUser)
    this.Languague = this.penghubung.CurrentUser.Languague
  }
}
