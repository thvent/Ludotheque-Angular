import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DetailsJeu} from '../_models/details-jeu';
import {JeuService} from '../_services/jeu.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-details-jeu',
  templateUrl: './details-jeu.component.html',
  styleUrls: ['./details-jeu.component.css']
})
export class DetailsJeuComponent implements OnInit {
  jeux$: Observable<DetailsJeu>;
  id: number;


  constructor(private route: ActivatedRoute, private router: Router, private service: JeuService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.jeux$ = this.service.getJeuById(this.id);
  }

  goBack(): void {
    this.router.navigate(['/listejeux']);
  }

}
