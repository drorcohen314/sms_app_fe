import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  isSignup = false;
  error = ''
  constructor(private userService: UserService) {}

  async login() {
    try { 
      await this.userService.sign_in(this.username, this.password)
    }
     catch (err) {
       this.error = 'Failed to log in'
    }
  }

  async signup() {
    try { 
      await this.userService.sign_up(this.username, this.password)
    }
     catch (err) {
       this.error = 'Failed to create user'
    }
  }
}
