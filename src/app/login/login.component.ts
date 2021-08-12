import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: User[] = [];
  wrongValues: boolean = false;
  loginForm: any;

  constructor(private storage: LocalStorageService, private route: Router, private userService: UserService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const username = this.storage.get('curUser');
    if (username) {
      this.login(username);
    }
  }
  username() {
    return this.loginForm.get('username') as FormControl;
  }
  password() {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit(): void {

    if (this.loginForm.valid) {
      this.wrongValues = true;
      const users = this.userService.getUsers();
      users.map(el => {
        if (el.username === this.username().value && el.password === this.password().value) {
          this.login(el.username);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  login(username: string): void {
    this.wrongValues = false;
    this.storage.set('curUser', username);
    this.route.navigate(['/canvas']);
  }
}