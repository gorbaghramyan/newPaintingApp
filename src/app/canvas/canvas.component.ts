import { Circle } from './../models/circle.model';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "../services/storage.service";
import { ECircleCount } from "../enums/circle-count.enum";
import { IProject } from "../interfaces/project.interface";
import { ICircle } from "../interfaces/circle.interface";
import { Router } from '@angular/router';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  circles: ICircle[] = [];
  projectName: string = '';
  projectList: IProject[] = [];
  projectListName = 'circlesProject';
  canvasSizes: number[] = [
    ECircleCount.MIN,
    ECircleCount.MID,
    ECircleCount.MAX
  ];
  selectedSize: number = this.canvasSizes[0];
  currentColor: string = '#000';

  constructor(private storage: LocalStorageService, private route: Router) { }

  ngOnInit(): void {
    const username = this.storage.get('curUser');
    if (!username) {
      this.logout();
    }
    this.getProjects();
  }

  onGenerateCircles(): void {
    this.resetColors();
  }

  onSizeSelect(): void {
    if (this.isEmpty(this.circles)) {
      return;
    }
    this.resetColors();
  }

  onCircleClick(circle: ICircle): void {
    this.circles[circle.id].color = circle.color === this.currentColor ? 'transparent' : this.currentColor;
  }

  onResetColor(): void {
    if (!this.isEmpty(this.circles)) {
      this.resetColors();
    }
  }

  resetColors(): void {
    this.circles = [];
    for (let i = 0; i < this.selectedSize; i++) {
      this.circles.push(new Circle(i, this.newId(), ''));
    }
  }

  onFillCircles(): void {
    if (this.isEmpty(this.circles)) {
      return;
    }
    this.circles.forEach((item) => {
      item.color = this.currentColor;
    })
  }

  isEmpty(arr: ICircle[]): boolean {
    return !arr.length;
  }

  newId(): string {
    return String(Date.now());
  }

  onSave(): void {
    if (this.isEmpty(this.circles)) {
      return;
    }

    if (!this.projectName) {
      alert('Name your project first');
      return;
    }
    this.projectList.push({
      id: this.newId(),
      name: this.projectName,
      circles: this.circles,
    })
    const projectsStr = JSON.stringify(this.projectList);
    this.storage.set(this.projectListName, projectsStr);
  }

  getProjects(): void {
    const projects = this.storage.get(this.projectListName);
    if (projects) {
      this.projectList = JSON.parse(projects);
    }
  }
  deleteProject(project: IProject): void {
    this.projectList.map((el, i) => {
      if (el.id === project.id) {
        this.projectList.splice(i, 1);
        this.storage.set(this.projectListName, JSON.stringify(this.projectList));
        return;
      }
    })

  }
  selectProject(project: IProject): void {
    this.selectedSize = project.circles.length;
    this.circles = project.circles;
  }
  logout(): void {
    this.storage.remove('curUser');
    this.route.navigate(['/']);
  }
}