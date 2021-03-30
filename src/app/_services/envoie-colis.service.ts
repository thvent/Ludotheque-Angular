import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {User} from '../_models/user';
import {UserGame} from '../_models/user-game';
import {UserG} from '../_models/user-g';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EnvoieColisService {

  constructor(private http: HttpClient) {
  }

  getListGame(id: number): Observable<UserG> {
    return this.http.get<any>(environment.apiUrl + '/users/' + id, httpOptions)
      .pipe(
        map(rep => rep.data.item),
        catchError(err => throwError(err))
      );
  }
}
