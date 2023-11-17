import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from './message';
import { UserService } from './user.service';
import { getBaseUrl } from '../../utils/environment-utils';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messages: Array<Message> = [];
  private messagesSubject = new BehaviorSubject< Array<Message>>(this.messages);
  messages$: Observable<Array<Message>> = this.messagesSubject.asObservable();
  constructor(private http: HttpClient, private userService: UserService) {

  }

  get get_messages(): Array<Message> {
    return this.messages;
  }

  set_messages(messages: Array<Message>): void {
    this.messages = messages;
    this.messagesSubject.next(this.get_messages);
  }

  set_message_status(id: number) {
    const messages_copy = [...this.messages]
    const messageIndex = messages_copy.findIndex(message => message.id === id);
    messages_copy[messageIndex].sent = true;
    this.set_messages(messages_copy);
  }

  async get_messages_for_user(): Promise<any> {
    const path = getBaseUrl() + '/messages/show_by_sender/' + this.userService.get_key
    return new Promise<any>((resolve,reject) => {this.http.get<any>(path).subscribe(
      {
        next: data => {
        this.set_messages(data);
        resolve(this.messages)
      },
      error: (error) => {
        console.log(error)
        reject(error)
      }}
    )});
  }

  async send_message(recipient: string, content:string) {
      const body = {
        "message" : {
          recipient: recipient,
          content: content
        },
        "key": this.userService.get_key
      }
      const path = getBaseUrl() +  '/messages'
      return new Promise<any>((resolve,reject) => {this.http.post<any>(path, body).subscribe(
        {
          next: data => {
          this.set_messages([...this.get_messages, data]);
          resolve(this.messages)
        },
        error: (error) => {
          console.log(error)
          reject(error)
        }}
      )});
  }
}
