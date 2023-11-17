import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { MessagesService } from '../../messages.service';
import { UserService } from '../../user.service'
import { Subscription } from 'rxjs';
import { Message } from '../../message';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, MessageComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  socket$!: WebSocketSubject<any>;
  messages: Array<Message> = []
  messagesSubscription!: Subscription;
  constructor(private messagesService: MessagesService, private userService: UserService) {}

  ngOnInit(): void {
    this.socket$ = webSocket('ws://localhost:3000/cable');

    const identifier = JSON.stringify({ channel: 'MessageStatusChannel', key: this.userService.get_key })
    this.socket$.subscribe(
      {
        next: (message) =>{
          if (message.identifier === identifier && message.message) {
            this.messagesService.set_message_status(message.message.id)
          }
        },
        error: (err: any) => {
          console.error('WebSocket error:', err);
      },
        complete: () => {
          console.log('WebSocket connection closed.');
        }
      }
    );

    this.socket$.next({ command: 'subscribe', identifier: JSON.stringify({ channel: 'MessageStatusChannel', key: this.userService.get_key }) });

    this.messagesSubscription = this.messagesService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }
}
