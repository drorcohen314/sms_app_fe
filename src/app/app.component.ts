import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from  '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { MessagesService } from './messages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterOutlet, ChatComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fe';
  key: string | null = null;
  keySubscription!: Subscription;

  constructor(private userService: UserService, private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.keySubscription = this.userService.key$.subscribe((key) => {
      this.key = key;
      this.messagesService.get_messages_for_user()
    });
  }

  ngOnDestroy(): void {
    this.keySubscription.unsubscribe();
  }

  getUser(): void {
    this.key = this.userService.get_key;
  }
}
