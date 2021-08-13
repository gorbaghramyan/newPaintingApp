import { Project } from './models/project.model';
import { FormGroup } from '@angular/forms';
import { User } from './models/user.model';

export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

export function UniqueUsername(username: string, users: User[]) {    
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[username];
        users.map(el => {
        const matchingControl = el.username;

        if (control.value === matchingControl) {
            control.setErrors({ contains: true });
        }
    })
    }
}

export function UniqueProjectName(name: string, list: Project[]) {    
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[name];
        list.map(el => {
        const matchingControl = el.name;

        if (control.value === matchingControl) {
            control.setErrors({ contains: true });
        }
    })
    }
}