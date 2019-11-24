import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HelpMe } from './help-me';
import { environment } from 'src/environments/environment';

export class Specialist {
    id: number;
    name: string;
    description: string;
    img: string;
    userId: number;

    constructor(id: string, name: string, description: string, userId: string, img: string | null) {
        this.id = Number.parseInt(id, 10);
        this.name = name;
        this.description = description;
        this.img = HelpMe.getImg(img);
        this.userId = Number.parseInt(userId, 10);
    }

    static createForm(checkFunction): FormGroup {
        return new FormGroup({
            name: new FormControl('', [Validators.required, Validators.maxLength(45)], checkFunction),
            description: new FormControl('')
        });
    }

    // static checkName(nameControl: FormControl): Observable<any> {
    //     return of({ nameIsUsed: true });
    // }

    editForm(checkFunction): FormGroup {
        return new FormGroup({
            id: new FormControl(this.id),
            name: new FormControl(this.name, [Validators.required, Validators.maxLength(45)], checkFunction),
            description: new FormControl(this.description),
            userId: new FormControl(this.userId)
        });
    }

    // photoForm(): FormGroup {
    //     return new FormGroup({
    //         id: new FormControl(this.id),
    //         img: new FormControl('', [Validators.required])
    //     });
    // }

}
