import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {LpSolverTestComponent} from './lp-solver-test/lp-solver-test.component';
import {AjouterJeuxComponent} from './ajouter-jeux/ajouter-jeux.component';
import {NewaccountComponent} from './newaccount/newaccount.component';
import {ListeJeuxComponent} from './liste-jeux/liste-jeux.component';
import {EnvoieColisComponent} from './envoie-colis/envoie-colis.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'ajouter-jeux', component: AjouterJeuxComponent},
  {path: 'newaccount', component: NewaccountComponent},
  {path: 'listejeux', component: ListeJeuxComponent},
  {path: 'ro', component: LpSolverTestComponent},
  {path: 'envoie-colis', component: EnvoieColisComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
