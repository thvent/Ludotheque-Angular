import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {UserInfo} from '../_models/user-info';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, first, map} from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {errorObject} from 'rxjs/internal-compatibility';
import {AuthentificationService} from './authentification.service';
import {User} from '../_models/user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private messageService: MessageService, private authService: AuthentificationService) {
  }

  getProfile(): Observable<User> {
    return this.http.get<any>(environment.apiUrl + '/auth/user-profile', httpOptions)
      .pipe(
        map(rep => rep.data.item),
        catchError(err => throwError(err))
      );
  }

  getDetailedUser(id:number): Observable<UserInfo> {
    return this.http.get<any>(`${environment.apiUrl}/users/${id}`, httpOptions)
      .pipe(
        map(rep => rep.data.item),
        first(),
        catchError(err => throwError(err))
      );
  }


  achat(jeu_id:number, date_achat:string, lieu:string, prix:number): void {
    console.log('jeuId', jeu_id, 'date', date_achat, 'lieu', lieu, 'prix', prix);
    this.http.post<any>(`${environment.apiUrl}/users/${this.authService.userValue.id}/achat`, {jeu_id, date_achat, lieu, prix}, httpOptions).subscribe(
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

  suppression_achat(achat_id:number): void {
    console.log('achat_id', achat_id);
    this.http.post<any>(`${environment.apiUrl}/users/${this.authService.userValue.id}/vente`, {achat_id}, httpOptions).subscribe(
      () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Suppression d\'un jeu réussie',
          key:'main'
        })},
      error => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Suppression d\'un jeu échoué',
          key:'main'
        });}
    );
  }
}
