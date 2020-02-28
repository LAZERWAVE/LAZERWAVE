import {Component, ElementRef, AfterViewInit} from '@angular/core';
import { PenhubungService } from './../../backended/penhubung.service'
import { User } from 'src/app/Model/user';
import { RegisterThingsService } from 'src/app/backended/register/register-things.service';

declare const gapi: any;

@Component({
  selector: 'google-signin',
  template: '<button id="googleBtn">Google Sign-In</button>'
})
export class GoogleComponent implements AfterViewInit {
  
  private clientId:string = '558382025079-lmhiisa030jt3cfpl8p41offus2g9vrr.apps.googleusercontent.com';
  
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(that.element.nativeElement.firstChild);
    });
  }

  user: User;

  public attachSignin(element) {
    
    let that = this;
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        
        //YOUR CODE HERE
        this.user = new User();
        this.user.FirstName = profile.getName()+"";
        this.user.Email = profile.getEmail()+"";
        this.user.Phone = "+6282232338878"
        this.user.Id= 99;
        this.penghubung.CurrentUser = this.user;
        if(this.penghubung.registering){
          this.registerService.InsertUser(this.user.FirstName,"",this.user.FirstName,this.user.Email,"+6282232338878").subscribe(
            async queryy => {
              alert("insert succes <3");
            }
          )
        }

      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  
  constructor(public registerService: RegisterThingsService,public penghubung: PenhubungService,private element: ElementRef) {
    console.log('ElementRef: ', this.element);
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}