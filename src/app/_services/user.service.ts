import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {UserInfo} from '../_models/user-info';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {errorObject} from 'rxjs/internal-compatibility';
import {AuthentificationService} from './authentification.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private messageService: MessageService, private authService: AuthentificationService) {
  }

  getProfile(): Observable<UserInfo> {
    return this.http.get<any>(environment.apiUrl + '/auth/user-profile', httpOptions)
      .pipe(
        map(rep => rep.data.item),
        catchError(err => throwError(err))
      );
  }

  achat(jeuId:number, date:string, lieu:string, prix:number): void {
    console.log('jeuId', jeuId, 'date', date, 'lieu', lieu, 'prix', prix);
    console.log(`${environment.apiUrl}/users/${this.authService.userValue.id}/achat`);
    this.http.post<any>(`${environment.apiUrl}/users/${this.authService.userValue.id}/achat`, {jeuId, date, lieu, prix}, httpOptions).subscribe(
      () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Achat d\'un jeu réussie',
          key:'main'
        })},
      error => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Achat d\'un jeu échoué',
          key:'main'
        });}
    );
  }
}
