import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {Jeu} from '../_models/jeu';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

export const ANONYMOUS_GAME: Jeu = {
  id: 0,
  nom: '',
  description: '',
  theme_id: 1,
  editeur_id: 2,
  langue: '',
  age: 6,
  nombre_joueurs: 2,
  poids: '',
  categorie: '',
  duree: '',
  regles: ''
};

@Injectable({
  providedIn: 'root'
})
export class AjouterJeuxService {

  private gameSubject: BehaviorSubject<Jeu> = new BehaviorSubject<Jeu>(ANONYMOUS_GAME);

  constructor(private router: Router, private http: HttpClient) {
  }


  addGame(nom: string, description: string, theme: number, editeur: string, langue: string, age: number, poids: number,
          nombreJoueurs: number, categorie: string, duree: number, regle: string): Observable<any> {
    console.log(regle);
    return this.http.post<any>(`${environment.apiUrl}/jeux`, {nom, description, theme, editeur, langue, age, poids,
    nombreJoueurs, categorie, duree, regle}, httpOptions)
      .pipe(
        tap(rep => console.log(rep)),
        map(rep => {
          console.log(rep.data.token);
          const game = {...rep.data.response, jwtToken: rep.data.token};
          console.log('Game add: ', game);
          this.gameSubject.next(game);
          return game;
        }),
        shareReplay(),
        catchError(err => {
          this.gameSubject.next(ANONYMOUS_GAME);
          return throwError(err);
          // return of('');
        }));
  }

}
