import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {AuthentificationService} from '../_services/authentification.service';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Jeu} from '../_models/jeu';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-suppression-achat',
  templateUrl: './suppression-achat.component.html',
  styleUrls: ['./suppression-achat.component.css']
})
export class SuppressionAchatComponent implements OnInit {

  jeuxAchetes:Observable<Jeu>;

  form: any = {
    jeu_id: null
  };

  formulaire = new FormGroup({
    jeu_id: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthentificationService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getDetailedUser(this.authService.userValue.id).pipe(
      map(user => user.jeuxAchetes)
    ).subscribe(
      rep => this.jeuxAchetes = rep;
    );
  }

  onSubmit(): void {
    this.form = {...this.form, ...this.formulaire.value};
    let jeu:Jeu;
    this.jeuxAchetes.subscribe()
    this.userService.suppression_achat(
    ));
  }

}
