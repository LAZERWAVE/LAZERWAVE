import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/user';
import { PenhubungService } from 'src/app/backended/penhubung.service';
import { LoginThingsService } from 'src/app/backended/login/login-things.service';
import { async } from 'rxjs/internal/scheduler/async';
import { PhoneThingsService } from 'src/app/backended/phone/phone-things.service';
import { UserThingsService } from 'src/app/backended/user/user-things.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(public realUserService: UserThingsService,public phoneService: PhoneThingsService,public penghubung:PenhubungService,public userService: LoginThingsService) { }

  CurrUser: User;

  showPhone: boolean
  showPassword: boolean
  validPassword: boolean
  validPhone: boolean
  upPhone: number

  upPassword: string

  ngOnInit() {
    this.init()
  }


  init(){
    this.getUser()
    this.showPassword = false;
    this.showPhone = false;
    this.validPassword = false;
    this.upPassword=""
      
  }

  save(){
    alert(this.CurrUser.Kota)
    this.realUserService.UpdateData(this.CurrUser.Id,this.CurrUser.Title,this.CurrUser.FirstName,this.CurrUser.LastName,this.CurrUser.Kota,this.CurrUser.Alamat,this.CurrUser.Kode).subscribe(
      async result =>{
        await alert("update Succes")
      }
    )
  }

  togglePhone(){
    this.showPhone = !this.showPhone
  }

  validatePhone(){
    this.validate(this.upPhone);
    this.validPhone = this.valid
    
  }

  togglePassword(){
    this.showPassword =!this.showPassword
  }

  getUser(){
    this.userService.getAllUser().subscribe(
      async result =>{
        await this.setUser();
    })
  }

  setUser(){
    this.CurrUser = this.penghubung.CurrentUser
    if(this.CurrUser.Kota == null || this.CurrUser.Alamat == null || this.CurrUser.Kode == null){
      this.CurrUser.Kode="";
      this.CurrUser.Alamat="";
      this.CurrUser.Kota="";
    }
  }

  tet(){
    if(this.upPassword.length >7){
      this.validPassword = true;
    }else{
      this.validPassword = false;
    }
  }

  valid: boolean

  validate(phone_number: number){
    var access_key = 'cf589db20d47d2002098cc8ceb40cfe5';
    this.valid=false;
    $(document).ready(function(){
      $.ajax({
        url: 'http://apilayer.net/api/validate?access_key=' + access_key + '&number=' + phone_number,   
        dataType: 'jsonp',
        success: function(json) {
  
        // Access and use your preferred validation result objects
          
          console.log(json.valid);
          this.valid = json.valid
          console.log(json.country_code);
          console.log(json.carrier);
          this.valid=json.valid
          if(this.valid == false) alert("Not Valid")
        }
       }
      );
    })
  }
}
