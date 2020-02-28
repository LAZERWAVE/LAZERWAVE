import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client'
import { Socket } from 'net';

@Injectable({
  providedIn: 'root'
})
export class ChatThingsService {


  socket: any;
  readonly uri: string = 'ws://localhost:1000';

  constructor() {
    this.socket = io(this.uri);
  }

  public listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  public emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
