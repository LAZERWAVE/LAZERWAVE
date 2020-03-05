import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapPopUpService {

  constructor() { }

  makeCapitalPopup(data: any): string {
    return "" +
      "<div>Hotel: "+data.Name+"</div>" +
      "<div>Price: "+data.Price+"</div>";
  }
}
