import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor() { }

  token: string;
  expiration: Date;
  username: string;
  isLoggedIn: boolean;

  setToken(){
    this.token = "";
    this.isLoggedIn = false;
    this.username = "";
    var session = JSON.parse(localStorage.getItem('session'));
    if(session != null){
      if(new Date(session.expiration) > new Date()){
        this.token = session.token;
        this.expiration = session.expiration;
        this.username = session.username;
        this.isLoggedIn = true;
      }
    }
  }

  isLogged(){
    return this.isLoggedIn;
  }

  logout(){
    this.isLoggedIn = false;
    this.token = "";
    this.username = "";
    localStorage.clear();
  }
}
