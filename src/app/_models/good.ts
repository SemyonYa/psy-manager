import { FormGroup, FormControl, Validators } from '@angular/forms';

export class Good {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    specialistId: number;
    invisible: number;

    constructor(id: string, name: string, description: string, price: string, duration: string, specialistId: string, invisible: string) {
        this.id = Number.parseInt(id, 10);
        this.name = name;
        this.description = description;
        this.price = Number.parseInt(price, 10);
        this.duration = Number.parseInt(duration, 10);
        this.specialistId = Number.parseInt(specialistId, 10);
        this.invisible = Number.parseInt(invisible, 10);
    }

    static createForm(specialistId): FormGroup {
        return new FormGroup({
            name: new FormControl('', Validators.required),
            description: new FormControl(''),
            price: new FormControl(0, [Validators.required, Validators.min(0)]),
            duration: new FormControl(0, [Validators.required, Validators.min(0)]),
            specialistId: new FormControl(specialistId),
            invisible: new FormControl(0)
        });
    }

    editForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(this.id),
            name: new FormControl(this.name, Validators.required),
            description: new FormControl(this.description),
            price: new FormControl(this.price, [Validators.required, Validators.min(0)]),
            duration: new FormControl(this.duration, [Validators.required, Validators.min(0)]),
            specialistId: new FormControl(this.specialistId),
            invisible: new FormControl(this.invisible)
        });
    }
}
