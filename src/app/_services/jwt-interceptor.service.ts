import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthentificationService} from './authentification.service';
import {AjouterJeuxService} from './ajouter-jeux.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthentificationService, private ajouteService: AjouterJeuxService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user$ is logged in and request is to the api url
    const isApiUrl = req.url.startsWith(environment.apiUrl);
    const user = this.authService.userValue;
    const isLoggedIn = user && user.jwtToken;
    if (isLoggedIn && isApiUrl) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${user.jwtToken}` }
      });
    }
    return next.handle(req);  }
}
