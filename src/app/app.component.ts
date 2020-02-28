import { Component, Directive, ElementRef } from '@angular/core';
import { PenhubungService } from './backended/penhubung.service'
import { Router } from '@angular/router';

// declare const gapi: any;

// @Component({
//   selector: 'google-signin',
//   template: '<button id="googleBtn">Google Sign-In</button>'
// })


// export class InitGoogle{

//   public auth: any;
//   private clientId:string = "558382025079-9a42s35p6pe449mej1bufp2lsth3ijp2.apps.googleusercontent.com";

//   private scope = [
//     'profile',
//     'email',
//     'https://www.googleapis.com/auth/plus.me',
//     'https://www.googleapis.com/auth/contacts.readonly',
//     'https://www.googleapis.com/auth/admin.directory.user.readonly'
//   ].join(' ');

//   public googleInit(){
//     let THIS = this;
//   }

//   constructor(private element: ElementRef){

//   } 
// }


// <script src="https://apis.google.com/js/platform.js" async defer></script>
// <meta name="google-signin-client_id" content="">








@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})


export class AppComponent {
  title = 'tepeayangkusayangi';

  constructor(public penghubung: PenhubungService, private router : Router){
    this.penghubung.current="home";
    this.router.navigateByUrl("Home");
  }

}
