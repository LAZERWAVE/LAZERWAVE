import { Component, OnInit } from '@angular/core';
import { ChatThingsService } from 'src/app/backended/chathings/chat-things.service';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.scss']
})
export class ChattingComponent implements OnInit {

  constructor() { }
  private chatService: ChatThingsService = new ChatThingsService()
  ngOnInit() {
    this.chatService.listen('chat').subscribe(m =>{
      console.log(m);
    })
  }

  send(): void{
    this.chatService.emit("chat","DUAW WEWEK");
  }
}
