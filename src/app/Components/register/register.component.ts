import { Component, OnInit } from '@angular/core';

//to make toggle button
import { MatButtonModule, MatButtonToggleModule} from '@angular/material'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  PHONE :string
  EMAIL :string
  namefront :string
  nameback :string

  constructor() { }

  ngOnInit() {
  }

  gugel(){
    alert("google");
  }

  facebuk(){
    alert("facebook");
  }

  sumbit(){
    if(this.EMAIL == "" || this.EMAIL == null) {
      alert("The email Field Cannot be empty!");
      return;
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
  }
}
