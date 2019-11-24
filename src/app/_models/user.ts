import { FormGroup, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { HelpMe } from './help-me';

export class User {
    id: number;
    email: string;
    phone: string;
    login: string;
    img: string;
    specialistId: number;
    specialistName: string;
    specialistImg: string;

    // tslint:disable-next-line:max-line-length
    constructor(id: string, email: string, phone: string, login: string, specialistId: string, specialistName: string, specialistImg: string | null, img: string | null = '') {
        console.log('user', id, img);
        this.id = Number.parseInt(id, 10);
        this.email = email;
        this.phone = phone;
        this.login = login;
        this.specialistId = Number.parseInt(specialistId, 10);
        this.specialistName = specialistName;
        this.specialistImg = HelpMe.getImg(specialistImg);
        this.img = HelpMe.getImg(img);
    }

    static createForm(validateLogin: AsyncValidatorFn): FormGroup {
        return new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
            phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
            // tslint:disable-next-line:max-line-length
            login: new FormControl('', [Validators.required, Validators.maxLength(45), Validators.minLength(6), Validators.pattern('[A-Za-z]+')], validateLogin),
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
            // tslint:disable-next-line:max-line-length
            login: new FormControl(this.login, [Validators.required, Validators.maxLength(45), Validators.minLength(6), Validators.pattern('[A-Za-z]+')], validateLogin),
        });
    }
}
