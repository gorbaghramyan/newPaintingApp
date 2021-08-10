export class User {
  username: string = '';
  fname: string = '';
  lname: string = '';
  password: string = '';

  constructor(username: string, fname: string, lname: string,password: string) {
    this.username = username;
    this.fname = fname;
    this.lname = lname;
    this.password = password;
  }
}