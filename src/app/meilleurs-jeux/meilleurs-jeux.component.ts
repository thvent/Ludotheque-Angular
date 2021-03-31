import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Jeu} from '../_models/jeu';
import {Commentaire} from '../_models/Commentaire';
import {JeuService} from '../_services/jeu.service';
import {MessageService} from 'primeng/api';
import {noop, Observable, of} from 'rxjs';

@Component({
  selector: 'app-meilleurs-jeux',
  templateUrl: './meilleurs-jeux.component.html',
  styleUrls: ['./meilleurs-jeux.component.css']
})
export class MeilleursJeuxComponent implements OnInit {
  coms$: Observable<Commentaire>;
  jeux$: Observable<Jeu>;
  meilleur = [];
  note: {};

  constructor(private router: Router, private messageService: MessageService, private route: ActivatedRoute, private service: JeuService) {
  }

  ngOnInit(): void {
    this.jeux$ = this.service.getJeux();
    this.jeux$.subscribe({
      next(jeu){}
      }
    )
  }

  jeuSelectionne(jeu: Jeu): void {
    this.router.navigate(['/listejeux', jeu.id]);
  }



}
