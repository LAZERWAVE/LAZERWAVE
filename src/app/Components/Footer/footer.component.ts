import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PenhubungService } from '../../backended/penhubung.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public router: Router,public penghubung: PenhubungService) { }

  ngOnInit() {
  }

  gotoBlog(){
    if(this.penghubung.CurrentUser != null && this.penghubung.CurrentUser.FirstName == "admin"){
      this.router.navigateByUrl("ManageBlog");
      return;
    } 
    this.router.navigateByUrl("Blog")
  }
}
