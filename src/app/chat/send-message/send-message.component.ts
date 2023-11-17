import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessagesService } from '../../messages.service';

@Component({
  selector: 'app-send-message',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.css'
})
export class SendMessageComponent {
  recipient = '';
  content = '';
  error = ''
  constructor(private messagesService: MessagesService) {}

  async send_message() {
    try { 
      await this.messagesService.send_message(this.recipient,this.content);
    }
     catch (err) {
       this.error = 'Failed to send message'
    }
  }

  clear() {
    this.recipient = ''
    this.content = ''
  }
}
