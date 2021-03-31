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
import {TreeNode} from '../TreeNode';

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
  affichage: string;
  listeIdActuelle: Array<number> = new Array<number>();
  disp: string;
  poidsColis: number;

  import: any;

  constructor(private userService: UserService, private messageService: MessageService,
              private router: Router, private envoieService: EnvoieColisService) {
    this.loading = false;
  }

  validateur = new FormControl('', [Validators.nullValidator]);
  formulaire = new FormGroup({
  });
  form: any = {
  };

  arrayRemove(arr, value): Array<number> {
    return arr.filter( (ele) => {
      return ele !== value;
    });
  }
  mettre(nom: string, id: number, poids: string): void {
    if (id in this.form) {
      delete this.form[id];
      this.listeIdActuelle = this.arrayRemove(this.listeIdActuelle, id);
      this.poidsActuelle = this.poidsActuelle - Number(poids);
    } else {
      this.form[id] = [nom, poids];
      this.poidsActuelle = this.poidsActuelle + Number(poids);
      this.listeIdActuelle.push(id);
    }
}


  ngOnInit(): void {
    this.affichage = '';
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
    this.disp = '';
    this.listeIdActuelle.forEach((value => {
      this.disp += 'Nom du jeu à transmettre : ' + this.form[value][0] + ' disposant d\'un poid de : ' + this.form[value][1];
      this.disp += '\n';
    }));
  }
    sommeVect(vect: Array<TreeNode>): number {
    let somme = 0;
    vect.forEach(value => {
        somme += value.poids;
      });
    return somme;
    }

  jePrend(index: number, vect: Array<TreeNode>, solution: Array<TreeNode>[]): void {
      const clone: Array<TreeNode> = new Array<TreeNode>();
      vect.forEach( (value => {
        clone.push(value);
      }));
      const idx = this.listeIdActuelle[index];
      if (this.sommeVect(vect) + Number(this.form[idx][1]) > 50) {
        if (this.sommeVect(solution[0]) < this.sommeVect(vect)) {
          solution[0] = vect;
        }
      } else {
        vect.push(new TreeNode(idx, Number(this.form[idx][1])));
      }
      if (index < this.listeIdActuelle.length - 1) {
          this.jePrend(index + 1, vect, solution);
          this.jePrendPas(index + 1, clone, solution);
        } else {
          if (this.sommeVect(solution[0]) < this.sommeVect(vect)) {
            solution[0] = vect;
          }
      }
  }

  jePrendPas(index: number, vect: Array<TreeNode>, solution: Array<TreeNode>[]): void {
    if (index < this.listeIdActuelle.length - 1) {
      const clone: Array<TreeNode> = new Array<TreeNode>();
      vect.forEach( (value => {
        clone.push(value);
      }));
      this.jePrend(index + 1, vect, solution);
      this.jePrendPas(index + 1, clone, solution);
    } else {
      if (this.sommeVect(solution[0]) < this.sommeVect(vect)) {
        solution[0] = vect;
      }
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.affichage = '';
    this.poidsColis = 0;
    if (this.poidsActuelle > 50) {
      let idx = 0;
      let solut = new Array<TreeNode>();
      let solution = [];
      solution[0] = solut;
      this.jePrend(idx, new Array<TreeNode>(), solution);
      this.jePrendPas(idx, new Array<TreeNode>(), solution);
      const plsRtb: Array<TreeNode> = solution[0];
      plsRtb.forEach(value => {
        this.affichage += 'Nom du jeu à transmettre : ' + this.form[value.index][0] + ' disposant d\'un poid de : ' + value.poids;
      });
      this.poidsColis = this.sommeVect(solution[0]);
    } else {
      this.affichage = this.disp;
      this.poidsColis = this.poidsActuelle;
    }
  }
}
