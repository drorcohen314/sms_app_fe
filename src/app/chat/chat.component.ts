import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessagesComponent} from './messages/messages.component';
import { SendMessageComponent } from './send-message/send-message.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MessagesComponent, SendMessageComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

}
