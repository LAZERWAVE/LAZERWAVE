import { Component, OnInit } from '@angular/core';
import { PenhubungService } from 'src/app/backended/penhubung.service';
import { RegisterThingsService } from 'src/app/backended/register/register-things.service';
import { User } from 'src/app/Model/user';


declare var FB: any;
@Component({
  selector: 'app-facebook-sign-in',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss']
})
export class FacebookComponent implements OnInit {

  imgPath: string;

CurrUser: User;

  constructor(public penghubung: PenhubungService,public registerService: RegisterThingsService) { }
  ngOnInit() {
    FB.init({
      appId: '221563738886876', 
      cookie: false,
      xfbml: true,
      version: 'v5.0'
    });
  }
  facebookLogin() {
    console.log('submit login to facebook');
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        console.log(response.authResponse.userID);
        FB.api(
          '/me',
          'GET',
          {},
          (userData) => {
            console.table(userData);
          }
        );
        FB.api('/me', 'GET', { fields: 'first_name,last_name,name,id,picture.width(150).height(150),email' },
          (res) => {
            this.imgPath = res.picture.data.url;
            console.log(this.imgPath);
            console.log(res);
            
            this.CurrUser = new User();
            this.CurrUser.Email = res.email;
            this.CurrUser.FirstName = res.first_name;
            this.CurrUser.LastName = res.last_name;
            this.CurrUser.Id = 99;
            this.penghubung.CurrentUser = this.CurrUser;
            if(this.penghubung.registering){
              
              this.registerService.InsertUser(this.CurrUser.FirstName,this.CurrUser.LastName,this.CurrUser.FirstName,this.CurrUser.Email,"+6282232338878").subscribe(
                async queryy => {
                  alert("insert succes <3");
                }
              )
            }
          });
      } else {
        console.log('User login failed');
      }
    }, { scope: 'email' });

  }


}