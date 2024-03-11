import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "http://127.0.0.1:3333";
  isLoggedIn: boolean = false;
  email: string = '';
  private loggedInUser = new BehaviorSubject<string>('');

  constructor(private http:HttpClient) { }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const user = {
      firstName,
      lastName,
      email,
      password
    };
    return this.http.post(`${this.apiUrl}/sign-up`, user);
  }

  login(email: string, password: string): Observable<any> {
    const credentials = {
      email,
      password
    };
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  clearSession(){
    this.email = '';
    this.isLoggedIn = false;
    window.location.href = "/";
    this.loggedInUser.next('');
  }

  getLoggedInUser() {
    return this.loggedInUser.asObservable();
  }

  setLoggedInUser(username: string) {
    this.loggedInUser.next(username);
  }
}