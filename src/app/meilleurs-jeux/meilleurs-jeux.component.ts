import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Jeu} from '../_models/jeu';
import {JeuService} from '../_services/jeu.service';
import {MessageService} from 'primeng/api';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-meilleurs-jeux',
  templateUrl: './meilleurs-jeux.component.html',
  styleUrls: ['../liste-jeux/liste-jeux.component.css']
})
export class MeilleursJeuxComponent implements OnInit {
  jeux$: Observable<Jeu>;

  constructor(private router: Router, private messageService: MessageService, private route: ActivatedRoute, private service: JeuService) {
  }

  ngOnInit(): void {
    this.jeux$ = this.service.getJeuxSortByNote();
  }

  jeuSelectionne(jeu: Jeu): void {
    this.router.navigate(['/listejeux', jeu.id]);
  }

}
