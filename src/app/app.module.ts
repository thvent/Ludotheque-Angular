import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import localeFr from '@angular/common/locales/fr';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthentificationService} from './_services/authentification.service';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {registerLocaleData} from '@angular/common';
import {MomentModule} from 'ngx-moment';
import 'moment/locale/fr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtInterceptorService} from './_services/jwt-interceptor.service';
import { ProfileComponent } from './profile/profile.component';
import {UserService} from './_services/user.service';
import { LpSolverTestComponent } from './lp-solver-test/lp-solver-test.component';
import {MarkdownModule} from 'ngx-markdown';
import {AjouterJeuxComponent} from './ajouter-jeux/ajouter-jeux.component';
import { NewaccountComponent } from './newaccount/newaccount.component';
import { ListeJeuxComponent } from './liste-jeux/liste-jeux.component';
import { DetailsJeuComponent } from './details-jeu/details-jeu.component';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import { AchatJeuxComponent } from './achat-jeux/achat-jeux.component';
import {JeuService} from './_services/jeu.service';

import { EnvoieColisComponent } from './envoie-colis/envoie-colis.component';
import {PanelModule} from 'primeng/panel';
import { SuppressionAchatComponent } from './suppression-achat/suppression-achat.component';
import { AfficherCommentairesComponent } from './afficher-commentaires/afficher-commentaires.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    LpSolverTestComponent,
    AjouterJeuxComponent,
    NewaccountComponent,
    ListeJeuxComponent,
    DetailsJeuComponent,
    AchatJeuxComponent,
    EnvoieColisComponent,
    SuppressionAchatComponent,
    AfficherCommentairesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot(),
    AppRoutingModule,
    MomentModule,
    MessagesModule,
    ToastModule,
    HttpClientModule,
    ReactiveFormsModule,
    MenubarModule,
    ButtonModule,
    PanelModule
  ],
  providers: [AuthentificationService, MessageService,
    {provide: LOCALE_ID, useValue: 'fr-FR'},
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    UserService,
    JeuService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
