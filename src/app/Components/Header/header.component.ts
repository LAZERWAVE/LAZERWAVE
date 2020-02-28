import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PenhubungService } from './../../backended/penhubung.service'
import { Router } from '@angular/router'
import { LoginThingsService } from './../../backended/login/login-things.service'
import { Login3Component } from '../Login/login3/login3.component';
import { Login2Component } from '../Login/login2/login2.component';


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

  constructor(public loginService: LoginThingsService,public dialog: MatDialog,public penghubung: PenhubungService,private router: Router) { }

  test(){
    this.penghubung.Currency=this.Currency;
  }

  ngOnInit() {
    this.state="";
    this.Languague="Indonesia";
    this.Currency="IDR";

    var a = setInterval(()=>{
      if(this.penghubung.CurrentUser != null){
        this.Currency = this.penghubung.Currency;
        clearInterval(a)
      }
    },1000)
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
    this.router.navigateByUrl("Train");
  }

  openDialogLogin() {
    this.dialog.open(Login2Component)
  }

    
}
