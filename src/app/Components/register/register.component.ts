import { Component, OnInit } from '@angular/core';
import { RegisterThingsService } from '../../backended/register/register-things.service'
import { LoginThingsService } from '../../backended/login/login-things.service'
import { User } from './../../Model/user';

//to make toggle button
import { MatButtonModule, MatButtonToggleModule} from '@angular/material'
import { async } from 'rxjs/internal/scheduler/async';
import { Subscription } from 'apollo-angular';
import { PenhubungService } from 'src/app/backended/penhubung.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  pass :string
  PHONE :string
  EMAIL :string
  namefront :string
  nameback :string
  currUser$: Subscription
  users: User[];

  constructor(public penghubung: PenhubungService,private registerService: RegisterThingsService,private loginService: LoginThingsService) { }

  ngOnInit() {
  }

  gugel(){
    this.penghubung.registering=true;
  }

  facebuk(){
    this.penghubung.registering=true;
  }

  close(){
    this.close()
  }

  sumbit(){
    if(this.EMAIL == "" || this.EMAIL == null) {
      alert("The email Field Cannot be empty!");
      return;
    }

    this.loginService.getUserByPhoneOrEmail(this.EMAIL).subscribe(
      async result =>{
        this.users = result;
      }
    );
    
    if(this.users[0] != null){
      alert("user has already registered");
      return ;
    } 

    if(this.namefront == "" || this.namefront == null){
      alert("The first name Field Cannot be empty!");
      return;
    }

    if(this.nameback == "" || this.nameback == null){
      alert("The last name Field Cannot be empty!");
      return;
    }

    if(this.PHONE == "" || this.PHONE == null){
      alert("The Phone Field Cannot be empty!");
      return;
    } 

    if(this.pass == "" || this.pass == null){
      alert("The Password Field Cannot be empty!");
      return;
    } 

    this.registerService.InsertUser(this.namefront,this.nameback,this.pass,this.EMAIL,this.PHONE).subscribe(
      async queryy => {
        alert("insert succes <3");
      }
    )
  }
}
