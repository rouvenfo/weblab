import { Injectable } from '@angular/core';
import {
 HttpInterceptor,
 HttpRequest,
 HttpHandler,
 HttpEvent
} from '@angular/common/http';
 
import { Observable } from 'rxjs/Observable';
import { AuthenticationServiceService } from '../authentication-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private authenticationService: AuthenticationServiceService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {   

    var currentUser = JSON.parse(localStorage.getItem('session'));
    if(this.authenticationService.isLogged()){
      var token = this.authenticationService.token;
      const req = request.clone({
        setHeaders: {Authorization: 'Bearer ' + token}
      });

      return next.handle(req);
    }   

    return next.handle(request);
  }
}