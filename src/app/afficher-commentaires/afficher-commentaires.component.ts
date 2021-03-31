import { Component, OnInit } from '@angular/core';
import {JeuService} from '../_services/jeu.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-afficher-commentaires',
  templateUrl: './afficher-commentaires.component.html',
  styleUrls: ['./afficher-commentaires.component.css']
})
export class AfficherCommentairesComponent implements OnInit {

  comm: Observable<Jeu>;

  constructor(private jeuService: JeuService) { }

  ngOnInit(): void {
    this.jeux$ = this.jeuService.getProfile();
  }

}
