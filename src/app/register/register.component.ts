import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { LocalStorageService } from '../services/storage.service';
import { MustMatch, UniqueUsername } from '../validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  users: User[] = [];
  userListName = 'users'

  constructor(private formBuilder: FormBuilder, private storage: LocalStorageService, private route: Router) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      fname: ['', [Validators.required, Validators.minLength(3)]],
      lname: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confPassword: ['', Validators.required]
    }, {
      validator: [MustMatch('password', 'confPassword'), UniqueUsername('username', this.getUsers())]
    });
  }

  username() {
    return this.registerForm.get('username') as FormControl
  }

  fname() {
    return this.registerForm.get('fname') as FormControl
  }

  lname() {
    return this.registerForm.get('lname') as FormControl
  }

  password() {
    return this.registerForm.get('password') as FormControl
  }

  confPassword() {
    return this.registerForm.get('confPassword') as FormControl
  }

  onSubmit(): void {    
    if (this.registerForm.valid) {
      this.users.push(new User(this.username().value, this.fname().value, this.lname().value, this.password().value));
      const usersStr = JSON.stringify(this.users);
      this.storage.set(this.userListName, usersStr);
      this.storage.set('curUser', this.username().value);
      this.route.navigate(['/'])
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  getUsers(): User[] {
    const usersInLocal = this.storage.get(this.userListName);
    if (usersInLocal) {
      return JSON.parse(usersInLocal);
    }
    return [];
  }
  ngOnInit(): void {
    this.users = this.getUsers();
  }
}
