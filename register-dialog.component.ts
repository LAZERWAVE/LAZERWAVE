import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs'
import { KarcisCoService } from 'src/app/services/karcis-co.service';
import { FormControl, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.sass']
})
export class RegisterDialogComponent implements OnInit {

  customer$: Subscription;
  customer: Customer[] = [];
  name: string
  password: string
  email: string
  phone: string
  login: boolean
  valid: boolean
  constructor(private service:KarcisCoService) { }

  ngOnInit() {
    this.login = true;
    this.valid = false;
  }
  nameControl = new FormControl('', [
    Validators.required,
  ]);

  emailControl = new FormControl('', [
    Validators.required,
  ]);

  passwordControl = new FormControl('', [
    Validators.required,
  ]);

  phoneControl = new FormControl('', [
    Validators.required,
  ]);

  findCustomerEmailOrPhone() {
    this.email = this.emailControl.value;
    console.log(this.email)
    if (this.email !== '') {
      this.customer$ = this.service.getCustomerByEmailOrPhone(this.email).subscribe(async query => {
        this.customer = query.data.customerByEmailOrPhone;
        await this.checkCustomer();
      });
    }
  }
  findCustomerPassword(){
    this.password=this.passwordControl.value;
    console.log(this.password)
    if(this.password !==''){
      this.checkPassword();
    }
  }
  checkPassword(){
    console.log(this.customer[0].email+''+this.customer[0].password)
    if(this.customer[0].email===this.email ||this.customer[0].phone===this.email && this.customer[0].password===this.password){
      console.log('email and password bener')
    }
    else{
      console.log('error')
    }
  }
  checkCustomer() {
    console.log(this.customer[0])
    if (this.customer.length === 0) {
      // console.log('Register');
      this.login=false
    } else {
      // console.log('Login');
      this.login = true;
      this.valid = true;
    }
  }

}
