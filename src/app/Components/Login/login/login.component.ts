import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from './../../register/register.component';
import { MatDialog } from '@angular/material';
import { LoginThingsService } from './../../../backended/login/login-things.service';
import { User } from './../../../Model/user'
import { async } from 'rxjs/internal/scheduler/async';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    pass :string
    PHONE :string
    email :string
    namefront :string
    nameback :string
    users: User[];
    validEmail: boolean;

    constructor(public dialog:MatDialog,public loginService: LoginThingsService) {}

    ngOnInit() {
        this.email = "";
        this.pass = "";
        //this.users = [new User(),new User()];
    }
    facebuk() {
        alert("facebook");
    }
    gugel() {
        alert("google");
    }

    sumbit() {
        if (this.email == "" || this.email == null)
            alert("The Field Cannot be empty!");
        else{
            this.loginService.getUserByPhoneOrEmail(this.email).subscribe(async result =>{
                this.users = result;
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
                if (this.users[0] != null)
                    alert("DUAR WELCOME <3");
                else
                    alert("Wrong password or email");
                    
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
  