import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {Jeu} from '../_models/jeu';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  ajout(commentaire:string, note:number, jeu_id:number): void {
    console.log('commentaire', commentaire, 'note', note, 'jeu_id', jeu_id);
    this.http.post<any>(`${environment.apiUrl}/commentaires`, {commentaire, note, jeu_id}, httpOptions).subscribe(
      () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Ajout d\'un commentaire réussie',
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
