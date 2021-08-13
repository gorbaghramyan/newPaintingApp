import { ICircle } from './../interfaces/circle.interface';
import { IProject } from './../interfaces/project.interface';

export class Project implements IProject {
  username: string = '';
  id: string = '';
  name: string = '';
  circles: ICircle[] = [];

  constructor(username: string = '', id: string = '', name: string = '', circles: ICircle[] = []) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.circles = circles;
  }
}