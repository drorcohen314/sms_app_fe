import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { getBaseUrl } from '../../utils/environment-utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private key: string | null = null;
  private keySubject = new BehaviorSubject<string | null>(this.key);
  key$: Observable<string | null> = this.keySubject.asObservable();
  
  constructor(private http: HttpClient) {

  }

  get get_key(): string | null {
    return this.key;
  }

  set_key(key: string | null): void {
    this.key = key;
    this.keySubject.next(this.get_key);
  }

  async sign_in(username: string, password: string): Promise<any> {
    const path = getBaseUrl() + '/users/get_key/' + username +'/' + password
    return new Promise<any>((resolve,reject) => {this.http.get<any>(path).subscribe(
      {
        next: data => {
        this.set_key(data.key);
        resolve(this.get_key)
      },
      error: (error) => {
        console.log(error)
        reject(error)
      }}
    )});
  }

  async sign_up(username: string, password: string): Promise<any> {
    const body = { 
      "username": username,
      "password": password 
    };
    const path = getBaseUrl() +  '/users'
    return new Promise<any>((resolve,reject) => {this.http.post<any>(path,body).subscribe(
      {
        next: data => {
        this.set_key(data.key);
        resolve(this.key)
      },
      error: (error) => {
        console.log(error)
        reject(error)
      }}
    )});
  }
}
