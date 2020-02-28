import { Component, OnInit } from '@angular/core';
import { PenhubungService } from 'src/app/backended/penhubung.service';

@Component({
  selector: 'app-train-detail',
  templateUrl: './train-detail.component.html',
  styleUrls: ['./train-detail.component.scss']
})
export class TrainDetailComponent implements OnInit {

  constructor(public penghubung: PenhubungService) { }

  ngOnInit() {

  }

  

}
