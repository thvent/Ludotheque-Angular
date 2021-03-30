import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {AuthentificationService} from '../_services/authentification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AjouterJeuxService} from '../_services/ajouter-jeux.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-ajouter-jeux',
  templateUrl: './ajouter-jeux.component.html',
  styleUrls: ['./ajouter-jeux.component.css']
})
export class AjouterJeuxComponent implements OnInit {
  form: any = {
    nom: null,
    description: null,
    regles: null,
    image: null,
    themes: null,
    editeur: null,
    dure: null,
    langue: null,
    number: null,
    poids: null,
    age: null,
    categorie: null
  };
  loading = false;
  returnUrl: string;
  error = '';

  formulaire = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    regles: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    image: new FormControl('', [Validators.required]),
    themes: new FormControl('', [Validators.required]),
    editeur: new FormControl('', [Validators.required]),
    dure: new FormControl('', [Validators.required]),
    langue: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required, Validators.min(2), Validators.max(10)]),
    poids: new FormControl('', [Validators.required, Validators.min(0.1), Validators.max(5)]),
    age: new FormControl('', [Validators.required, Validators.min(1), Validators.max(16)]),
    categorie: new FormControl('', [Validators.required])
  });

  constructor(private messageService: MessageService, private gameService: AjouterJeuxService, private router: Router,
              private route: ActivatedRoute) { }


  get nom(): AbstractControl {
    return this.formulaire.get('nom');
  }

  get description(): AbstractControl {
    return this.formulaire.get('description');
  }
  get regles(): AbstractControl {
    return this.formulaire.get('regles');
  }
  get image(): AbstractControl {
    return this.formulaire.get('image');
  }
  get themes(): AbstractControl {
    return this.formulaire.get('themes');
  }
  get editeur(): AbstractControl {
    return this.formulaire.get('editeur');
  }
  get dure(): AbstractControl {
    return this.formulaire.get('dure');
  }
  get langue(): AbstractControl {
    return this.formulaire.get('langue');
  }
  get number(): AbstractControl {
    return this.formulaire.get('number');
  }
  get poids(): AbstractControl {
    return this.formulaire.get('poids');
  }
  get age(): AbstractControl {
    return this.formulaire.get('age');
  }
  get categorie(): AbstractControl {
    return this.formulaire.get('categorie');
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit(): void {
    this.form = {...this.form, ...this.formulaire.value};
    this.loading = true;
    this.gameService.addGame(this.form.nom, this.form.description, this.form.themes, this.form.editeur, this.form.langue, this.form.age,
      this.form.poids, this.form.nombreJoueurs, this.form.categorie, this.form.dure, this.form.regles).pipe(first())
      .subscribe(() => {
        this.router.navigate([this.returnUrl]);
        this.messageService.add({severity: 'info', summary: 'ajout', detail: `Ajout de : ${this.form.nom}`, key: 'main'});
      },
        error => {
        console.log('Erreur: ', error);
        this.loading = false;
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: this.error, key: 'main'});
        });

  }
}
