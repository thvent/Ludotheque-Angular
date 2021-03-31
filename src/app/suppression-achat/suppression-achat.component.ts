import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-suppression-achat',
  templateUrl: './suppression-achat.component.html',
  styleUrls: ['./suppression-achat.component.css']
})
export class SuppressionAchatComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getDetailedUser();
  }

  onSubmit(): void {

  }

}
