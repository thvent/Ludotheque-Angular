import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {AuthentificationService} from '../_services/authentification.service';
import {filter, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Jeu} from '../_models/jeu';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-suppression-achat',
  templateUrl: './suppression-achat.component.html',
  styleUrls: ['./suppression-achat.component.css']
})
export class SuppressionAchatComponent implements OnInit {

  jeux$: Observable<Jeu>;

  form: any = {
    jeu_id: null
  };

  formulaire = new FormGroup({
    jeu_id: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthentificationService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getDetailedUser(this.authService.userValue.id).pipe(
      map(user => user.jeux),
    ).subscribe(
      rep => this.jeux$ = rep
    );
    this.jeux$.subscribe(console.log);
  }

  onSubmit(): void {
    this.form = {...this.form, ...this.formulaire.value};
    this.userService.suppression_achat(this.form.jeu_id);
  }

}
