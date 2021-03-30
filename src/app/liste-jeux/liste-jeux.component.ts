import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-liste-jeux',
  templateUrl: './liste-jeux.component.html',
  styleUrls: ['./liste-jeux.component.css']
})
export class ListeJeuxComponent implements OnInit {
  lesJeux: Jeu[];

  constructor(private router: Router, private route: ActivatedRoute, private service: JeuService) {
  }

  ngOnInit(): void {
  }

  jeuSelectionne(jeu: Jeu): void {
    this.router.navigate(['/jeu', jeu.id]);
  }

}
