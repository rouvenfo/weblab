import { Component, HostListener } from '@angular/core';
import { AuthenticationServiceService } from './authentication-service.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.component-mobile.css']
})
export class AppComponent {
  title = 'emtippspiel-app';

  menuShow: boolean;
  width: number;

  constructor(public authenticationService: AuthenticationServiceService) { }

  ngOnInit(){
    this.authenticationService.setToken();
    if(this.authenticationService.isLogged()){
      setTimeout(() => window.location.href = "#/logout", 1000 * 60 * 60);
    }
    this.width = window.innerWidth;
  }

  toggleMenu(){
    this.menuShow = !this.menuShow;
  }

  @HostListener('window:resize', ['$event']) 
  onresize(event) {
    this.width = window.innerWidth;
  }
}
