import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Jeu} from '../_models/jeu';
import {JeuService} from '../_services/jeu.service';
import {MessageService} from 'primeng/api';
import {noop, Observable, of} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-liste-jeux',
  templateUrl: './liste-jeux.component.html',
  styleUrls: ['./liste-jeux.component.css']
})
export class ListeJeuxComponent implements OnInit {
  jeux$: Observable<Jeu>;
  nbrJoueur: number;
  age: number;

  formulaire = new FormGroup({
    nombreJoueurs: new FormControl('', Validators.required),
  });

  form: any = {
    nombreJoueurs: null,
  };

  formulaire2 = new FormGroup({
    age: new FormControl('', Validators.required),
  });

  form2: any = {
    age: null,
  };

  loading = false;
  returnUrl: string;
  error = '';

  constructor(private router: Router, private messageService: MessageService, private route: ActivatedRoute, private service: JeuService) {
  }

  ngOnInit(): void {
    const lesJeux = [];
    this.service.getJeux().subscribe(
      str => lesJeux.push(str), noop, () => this.jeux$ = of(lesJeux[0])
    );
    console.log(lesJeux);
  }

  getNbrJoueurs(): number{
    return this.form.nombreJoueurs;
  }
  onSubmit(): void {
    this.form = {
      ...this.form, ...this.formulaire.value,
    };
    this.nbrJoueur = this.form.nombreJoueurs;
  }

  onSubmit2(): void {
    this.form2 = {
      ...this.form2, ...this.formulaire2.value,
    };
    console.log(this.form2.age);
    this.age = this.form2.age;
  }

  showDiv(): void {
    document.getElementById('filtre').style.display = 'block';
  }

  showDiv2(): void {
    document.getElementById('filtre2').style.display = 'block';
  }

  jeuSelectionne(jeu: Jeu): void {
    this.router.navigate(['/listejeux', jeu.id]);
  }

}
