import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

export class Specialist {
    id: number;
    name: string;
    description: string;
    userId: number;

    constructor(id: string, name: string, description: string, userId: string) {
        this.id = Number.parseInt(id, 10);
        this.name = name;
        this.description = description;
        this.userId = Number.parseInt(userId, 10);
    }

    static createForm(checkFunction): FormGroup {
        return new FormGroup({
            name: new FormControl('', Validators.required, checkFunction),
            description: new FormControl('')
        });
    }

    // static checkName(nameControl: FormControl): Observable<any> {
    //     return of({ nameIsUsed: true });
    // }

    editForm(checkFunction): FormGroup {
        return new FormGroup({
            id: new FormControl(this.id),
            name: new FormControl(this.name, Validators.required, checkFunction),
            description: new FormControl(this.description),
            userId: new FormControl(this.userId)
        });
    }

}
