import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Jeu} from '../_models/jeu';
import {JeuService} from '../_services/jeu.service';
import {MessageService} from 'primeng/api';
import {UserService} from '../_services/user.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-achat-jeux',
  templateUrl: './achat-jeux.component.html',
  styleUrls: ['./achat-jeux.component.css'],
  providers: [DatePipe]
})
export class AchatJeuxComponent implements OnInit {

  jeux$: Observable<Jeu>;

  form: any = {
    jeu: null,
    date: null,
    lieu: null,
    prix: null
  };

  loading = false;
  returnUrl: string;
  error = '';

  formulaire = new FormGroup({
    jeu: new FormControl('', Validators.required),
    lieu: new FormControl('', Validators.required),
    prix: new FormControl('', Validators.required)
  });

  constructor(private messageService: MessageService, private jeuService: JeuService, private userService: UserService, private datePipe: DatePipe){}

  ngOnInit(): void {
    this.jeux$ = this.jeuService.getProfile();
  }

  onSubmit() : void {
    this.form = {...this.form, ...this.formulaire.value, date: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')};
    this.userService.achat(this.form.jeu, this.form.date, this.form.lieu, this.form.prix);
  }

}
