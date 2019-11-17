import { FormGroup, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';

export class User {
    id: number;
    email: string;
    phone: string;
    login: string;
    specialistId: number;
    specialistName: string;

    constructor(id: string, email: string, phone: string, login: string, specialistId: string, specialistName: string) {
        this.id = Number.parseInt(id, 10);
        this.email = email;
        this.phone = phone;
        this.login = login;
        this.specialistId = Number.parseInt(specialistId, 10);
        this.specialistName = specialistName;
    }

    static createForm(validateLogin: AsyncValidatorFn): FormGroup {
        return new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
            phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
            login: new FormControl('', [Validators.required, Validators.maxLength(45), Validators.minLength(6)], validateLogin),
            specialistId: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        });
    }

    editForm(validateLogin: AsyncValidatorFn): FormGroup {
        return new FormGroup({
            id: new FormControl(this.id, Validators.required),
            email: new FormControl(this.email, [Validators.required, Validators.email, Validators.maxLength(50)]),
            phone: new FormControl(this.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
            specialistId: new FormControl(this.specialistId, [Validators.required]),
            login: new FormControl(this.login, [Validators.required, Validators.maxLength(45), Validators.minLength(6)], validateLogin),
        });
    }
}
