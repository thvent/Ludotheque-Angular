import { Component, OnInit } from '@angular/core';
import {UserInfo} from '../_models/user-info';
import {UserService} from '../_services/user.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {EnvoieColisService} from '../_services/envoie-colis.service';
import {UserGame} from '../_models/user-game';
import {PanelModule} from 'primeng/panel';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {passBoolean} from 'protractor/built/util';


@Component({

  selector: 'app-envoie-colis',
  templateUrl: './envoie-colis.component.html',
  styleUrls: ['./envoie-colis.component.css']
})
export class EnvoieColisComponent implements OnInit {

  user: UserInfo;
  loading: boolean;
  liste: Array<UserGame>;
  poidsTotal: number;
  poidsActuelle: number;
  import: any;
  montrer: any;
  formSecure: any = {
  };

  constructor(private userService: UserService, private messageService: MessageService,
              private router: Router, private envoieService: EnvoieColisService) {
    this.loading = false;
  }

  validateur = new FormControl(defaultStatus, [Validators.nullValidator]);
  formulaire = new FormGroup({
  });

  form: any = {
  };
  mettre(nom: string, id: number, poids: string): void {
    this.montrer = '';
    if (nom in this.form) {
      delete this.form[nom];
      this.poidsActuelle = this.poidsActuelle - Number(poids);
    } else {
      this.form[nom] = [id, poids];
      this.poidsActuelle = this.poidsActuelle + Number(poids);
    }
}


  ngOnInit(): void {
    this.montrer = '';
    this.poidsActuelle = 0;
    this.poidsTotal = 0;
    this.loading = true;
    this.userService.getProfile().subscribe(
      user => {
        this.user = {...this.user, ...user};
        this.envoieService.getListGame(this.user.id).forEach((value => {
        this.liste = value.jeux;
        value.jeux.forEach((value1 => {
            this.poidsTotal += Number(String(value1.jeu.poids));
          }));
        }));
        this.loading = false;
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'impossible d\'obtenir la liste des jeux' , key: 'main'});
        this.loading = false;
        this.router.navigateByUrl('/');
      }
    );
  }


  display(): void {
    this.montrer = JSON.stringify(this.form);
}
  onSubmit(): void {
    this.loading = true;
  }
}
