import { Component } from '@angular/core';
import * as moment from 'moment';
import {MenuItem, MessageService} from 'primeng/api';
import {AuthentificationService} from './_services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ludotheque-client';
  items: MenuItem[];

  constructor(public messageService: MessageService, public authService: AuthentificationService) {
  }

  show(): void {
    const now = moment().format('LL');
    this.messageService.add({
      key: 'main',
      severity: 'info',
      detail: `${this.title}, ${now}`,
    });
  }

  logout(): void {
    this.authService.logout();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.authService.isLoggedOut$.subscribe(login => {
      if (login) {
        this.items = [{
          label: 'Register',
          icon : 'pi pi-home',
          routerLink : '/register',
          routerLinkActiveOptions: {exact: true},
          command: () => {
            this.register();
          }
      },
          {
          label: 'Login',
          icon: 'pi pi-home',
          routerLink: '/login',
          routerLinkActiveOptions: {exact: true},
          command: () => {
            this.login();
          }
        },
          {
            label: 'Exo RO',
            icon: 'pi pi-eye',
            routerLink: '/ro',
            routerLinkActiveOptions: {exact: true},
          }];
      } else {
        this.items = [{
            label: 'Exo RO',
            icon: 'pi pi-eye',
            routerLink: '/ro',
            routerLinkActiveOptions: {exact: true},
          },
          {
            label: 'Profil',
            icon: 'pi pi-user',
            routerLink: '/profile',
            routerLinkActiveOptions: {exact: true}
          }];
      }
    });
}

      login(): void {
    console.log('Login');
    }

  register(): void {
    console.log('Register');
  }
}
