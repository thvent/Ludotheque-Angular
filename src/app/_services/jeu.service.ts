import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {Jeu} from '../_models/jeu';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class JeuService {

  constructor(private http: HttpClient) {
  }

  getProfile(): Observable<Jeu> {
    return this.http.get<any>(environment.apiUrl + '/jeux', httpOptions)
      .pipe(
        map(rep => rep.data.item),
        catchError(err => throwError(err))
      );
  }
}
