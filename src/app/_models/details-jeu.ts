import {Jeu} from './jeu';
import {Commentaire} from './Commentaire';
import {Observable} from 'rxjs';

export interface DetailsJeu extends Jeu{
  commentaires: Observable<Commentaire>;
  statistiques: any;
  tarif: any;
}
