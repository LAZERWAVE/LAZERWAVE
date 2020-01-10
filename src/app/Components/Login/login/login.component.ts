import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  test :string 
  constructor() { }

  ngOnInit() {
    this.test == "";
  }

  facebuk(){
    alert("facebook");
  }

  gugel(){
    alert("google");
  }
  
  sumbit(){
    if(this.test == "" || this.test == null) alert("The Field Cannot be empty!");
    else alert(this.test);
  }
}
