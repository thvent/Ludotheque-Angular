import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private refreshTokenTimeout;
  private token: string;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, {username, password}, {withCredentials: true})
      .pipe(map(rep => {
        this.userSubject.next(rep.data.user);
        this.token = rep.data.token;
        this.startRefreshTokenTimer();
        return rep.data.user;
      }));
  }

  logout(): void {
    this.http.post<any>(`${environment.apiUrl}/auth/logout`, {}, {withCredentials: true}).subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }


  refreshToken(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/refresh-token`, {}, {withCredentials: true})
      .pipe(map((user) => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  private startRefreshTokenTimer(): void {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    console.log('date refresh : ', timeout);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout);
  }


}
