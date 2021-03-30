import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {UserInfo} from '../_models/user-info';
import {Observable} from 'rxjs';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-details-jeu',
  templateUrl: './details-jeu.component.html',
  styleUrls: ['./details-jeu.component.css']
})
export class DetailsJeuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
