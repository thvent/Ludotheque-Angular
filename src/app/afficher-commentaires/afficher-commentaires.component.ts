import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Commentaire} from '../_models/Commentaire';
import {DetailsJeu} from '../_models/details-jeu';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-afficher-commentaires',
  templateUrl: './afficher-commentaires.component.html',
  styleUrls: ['./afficher-commentaires.component.css']
})
export class AfficherCommentairesComponent implements OnInit {

  @Input() jeux$: Observable<DetailsJeu>;
  commentaires$: Observable<Observable<Commentaire>>;

  constructor() {}

  ngOnInit(): void {
    this.commentaires$ = this.jeux$.pipe(
      map(jeu => jeu.commentaires)
    );
  }

}
