import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {Jeu} from '../_models/jeu';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JeuService {
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getProfile(): Observable<Jeu> {
    return this.http.get<any>(environment.apiUrl + '/jeux', this.httpOptions)
      .pipe(
        map(rep => rep.data.item),
        catchError(err => throwError(err))
      );
  }

  // tslint:disable-next-line:typedef
  getJeux(): Observable<Jeu> {
    const url = 'http://localhost:8000/api/jeux';
    // @ts-ignore
    return this.http.get<any>(url, this.httpOptions)
      .pipe(
        map(res => res.data.item),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        })
      );
  }
}