import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HelpMe } from './help-me';

export class Profile {
    organizationName: string;
    email: string;
    phone: string;
    specialistsQuantity: number;
    img: string;

    constructor(organizationName: string, email: string, phone: string, specQ: string, img: string) {
        this.organizationName = organizationName;
        this.email = email;
        this.phone = phone;
        this.specialistsQuantity = Number.parseInt(specQ, 10);
        this.img = HelpMe.getImg(img);
    }

    editForm(): FormGroup {
        return new FormGroup({
            organizationName: new FormControl(this.organizationName, [Validators.required, Validators.maxLength(150)]),
            email: new FormControl(this.email, [Validators.required, Validators.email, Validators.maxLength(45)]),
            // tslint:disable-next-line:max-line-length
            phone: new FormControl(this.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+')]),
            specialistsQuantity: new FormControl(this.specialistsQuantity)
        });
    }
}
