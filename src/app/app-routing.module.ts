import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {LpSolverTestComponent} from './lp-solver-test/lp-solver-test.component';
import {AjouterJeuxComponent} from './ajouter-jeux/ajouter-jeux.component';
import {NewaccountComponent} from './newaccount/newaccount.component';
import {ListeJeuxComponent} from './liste-jeux/liste-jeux.component';
import {EnvoieColisComponent} from './envoie-colis/envoie-colis.component';
import {DetailsJeuComponent} from './details-jeu/details-jeu.component';
import {MeilleursJeuxComponent} from './meilleurs-jeux/meilleurs-jeux.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'ajouter-jeux', component: AjouterJeuxComponent},
  {path: 'newaccount', component: NewaccountComponent},
  {path: 'listejeux', component: ListeJeuxComponent},
  {path: 'envoie-colis', component: EnvoieColisComponent},
  {path: 'listejeux/:id', component: DetailsJeuComponent},
  {path: 'meilleursjeux', component: MeilleursJeuxComponent},
  {path: 'ro', component: LpSolverTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
