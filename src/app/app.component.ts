import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from './service/chat.service';
import { Subscription, Subject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChatService]
})
export class AppComponent {

  subscription: Subscription = new Subscription;
  name: string = "username";
  message: string = "Enter your message";
  feedback: string = "FEEDBACK";

  messageList: string[] = [];


  constructor(private chatService: ChatService) {
    this.chatService.getNewMessages().subscribe((newMessage: any) => (this.updateMessage(newMessage)));
    this.chatService.typingNotify().subscribe((value: any) => (this.updateFeedback(value)));

  }

  send() {
    if (this.message !== "" && this.name !== "") {
      this.chatService.sendMessage(this.name + ' : ' + this.message);
      this.message = "";
    }
  }

  onInput() {
    if (this.name !== "") {
      this.chatService.typing(this.name + ' is typing......');
    }else{

    }
  }

  updateMessage(message: string) {
    this.messageList.push(message);
    this.feedback = "";
  }

  updateFeedback(message: string) {
    this.feedback = message;
    console.log(message);
    
  }

}
