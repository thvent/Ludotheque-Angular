import { Component, OnInit } from '@angular/core';
import {JeuService} from '../_services/jeu.service';
import {Observable} from 'rxjs';
import {Commentaire} from '../_models/Commentaire';


@Component({
  selector: 'app-afficher-commentaires',
  templateUrl: './afficher-commentaires.component.html',
  styleUrls: ['./afficher-commentaires.component.css']
})
export class AfficherCommentairesComponent implements OnInit {

  commentaires$: Observable<Observable<Commentaire>>;

  constructor(private jeuService: JeuService) { }

  ngOnInit(): void {
    this.commentaires$ = this.jeuService.getCommentaires(1);
    console.log("or m")
  }

}
