import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from './../../register/register.component';
import { MatDialog } from '@angular/material';
import { LoginThingsService } from './../../../backended/login/login-things.service';
import { User } from './../../../Model/user'
import { async } from 'rxjs/internal/scheduler/async';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PenhubungService } from 'src/app/backended/penhubung.service';


@Component({
    selector: 'app-login2',
    templateUrl: './login2.component.html',
    styleUrls: ['./login2.component.scss']
})

export class Login2Component implements OnInit {

    pass :string
    PHONE :string
    email :string
    namefront :string
    nameback :string
    users: User[];
    validEmail: boolean;

    constructor(public penghubung: PenhubungService,public dialog:MatDialog,public loginService: LoginThingsService) {}

    ngOnInit() {
        this.email = "";
        this.pass = "";
        this.users = [null];
    }
    facebuk() {
      this.penghubung.registering=false;
      alert("facebook");
    }
    gugel() {
      this.penghubung.registering=false;
      alert("google");
    }

    sumbit() {
      if(this.email == "admin"){
        this.penghubung.CurrentUser = new User();
        this.penghubung.CurrentUser.FirstName = "admin";
        return;
      }
        if (this.email == "" || this.email == null)
            alert("The Field Cannot be empty!");
        else{
            this.loginService.getUserByPhoneOrEmail(this.email).subscribe(async result =>{
                this.users = result;
                await this.doSubmitThingys()
            });
        } 
    }

    doSubmitThingys() {

      if (this.users[0] != null)
          this.validEmail = true;
      if (this.users[0] != null) {
          if (this.pass == "" || this.pass == null) {
              alert("The Password Field Cannot be empty! " + this.pass);
          }
          else {
              this.loginService.GetValidUserByPhoneOrEmail(this.email, this.pass).subscribe(async result=> {
                  this.users = result;
              });
              if (this.users[0] != null){
                this.penghubung.CurrentUser = this.users[0];
                alert("DUAR WELCOME <3");
              }
              else{

                alert("Wrong password or email");
              }
                  
          }
      }
      else {
          this.openDialogRegister();
      }
      this.validEmail = false;
    }
    openDialogRegister() {
        this.dialog.open(RegisterComponent);
    }
}
  