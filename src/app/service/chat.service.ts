import { Injectable } from '@angular/core';
import { Observable} from 'rxjs'
import { io } from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() {}

  socket=io('http://localhost:5000/');
  
  public getNewMessages = () => {
      return new Observable((observer:any) => {
          this.socket.on('message', (message) => {
            console.log(message);
              observer.next(message);
          });
      });
  }

  public typingNotify=()=>{
    return new Observable((observer:any)=>{
      this.socket.on('typing',(typingNotification)=>{
        console.log(typingNotification);
        observer.next(typingNotification);
      })
    })
  }

  public sendMessage(message: string) {    
    this.socket.emit('message', message);
  }

  public typing(typing: string){
    this.socket.emit('typing',typing);
  }


}
