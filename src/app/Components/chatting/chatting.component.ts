import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatThingsService } from 'src/app/backended/chathings/chat-things.service';
import { PenhubungService } from 'src/app/backended/penhubung.service';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.scss']
})
export class ChattingComponent implements OnInit {

  messageControl = new FormControl();
  messageLists: Array<any> = [];
  imgSrc: string

  constructor(public penghubung: PenhubungService,private chatService: ChatThingsService, private router: Router) { }

  ngOnInit() {
    this.chatService.listen('chat').subscribe(m => {
      this.messageLists.push(m);
    });
  }

  sort(){
    this.messageLists.reverse()
  }

  validate(message: String): Boolean{
    var getsplit = message.split("|");
    return this.penghubung.CurrentUser.Id+""==getsplit[1];
  }

  sendMessage() {
    var sender = this.penghubung.CurrentUser.Id;
    this.chatService.emit('chat', this.messageControl.value+"|"+sender);
    this.messageControl.setValue("");
  }

  sendImage(){
    var sender = this.penghubung.CurrentUser.Id;
    this.chatService.emit('chat', this.imgSrc+"|"+sender);
    this.messageControl.setValue("");
  }

  onFileChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imgSrc = reader.result;
    this.sendImage();
  }
}