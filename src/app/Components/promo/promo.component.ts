import { Component, OnInit } from '@angular/core';
import { PromoThingsService } from 'src/app/backended/promo/promo-things.service';
import { async } from 'rxjs/internal/scheduler/async';
import { Promo } from 'src/app/Model/Promo';
import { ShareButtonModule } from '@ngx-share/button';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {

  constructor(public promoService: PromoThingsService) { }

  ngOnInit() {
    this.getData()
  }

  AllPromo: Promo[]
  CurrPromo: Promo[]

  getData(){
    this.promoService.GetAllPromo().subscribe(
      async result =>{
        this.AllPromo = result
        await this.initData();
      }
    )
  }

  initData(){
    this.CurrPromo = [this.AllPromo.pop()]
  }
}
