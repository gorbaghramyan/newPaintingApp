import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  wrongValues: boolean = false;

  users: User[] = [];
  userListName = 'users'

  constructor(private storage: LocalStorageService, private route: Router) { }

  ngOnInit(): void {
    const username = this.storage.get('curUser');
    if (username) {
      this.login(username);
    }
  }

  getUsers(): User[] {
    const usersInLocal = this.storage.get(this.userListName);
    if (usersInLocal) {
      return JSON.parse(usersInLocal);
    }
    return [];
  }

  onSubmit(): void {
    const users = this.getUsers();
    this.wrongValues = true;
    users.map(el => {
      if (el.username === this.username && el.password === this.password) {
        this.login(this.username);
      }
    })
  }

  login(username: string): void {
    this.wrongValues = false;
    this.storage.set('curUser', username);
    this.route.navigate(['/canvas']);
  }
}
