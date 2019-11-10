import { Time } from '@angular/common';
import { FormGroup, FormControl, Validators, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { SeanceStatus } from './seance-status.enum';
import { HelpMe } from './help-me';

export class Seance {
    id: number;
    date: string; // Date;
    time: Time;
    duration: number;
    price: number;
    status: number;
    goodId: number;

    constructor(id: string, date: string, time: string, duration: string, price: string, status: string, goodId: string) {
        this.id = Number.parseInt(id, 10);
        this.date = date;
        this.time = { hours: Number.parseInt(time.split(':')[0], 10), minutes: Number.parseInt(time.split(':')[1], 10) };
        this.duration = Number.parseInt(duration, 10);
        this.price = Number.parseInt(price, 10);
        this.status = Number.parseInt(status, 10);
        this.goodId = Number.parseInt(goodId, 10);
    }

    // tslint:disable-next-line:max-line-length
    static createForm(specialistId, date: Date, time: string, checkForm: AsyncValidatorFn): FormGroup {
        const dateFormated = HelpMe.dateToString(date);
        return new FormGroup({
            specialistId: new FormControl(specialistId, Validators.required),
            date: new FormControl(dateFormated, Validators.required),
            time: new FormControl(time, Validators.required),
            duration: new FormControl('', [Validators.required, Validators.min(5)]),
            price: new FormControl('', [Validators.required, Validators.min(0)]),
            status: new FormControl(SeanceStatus.Created, Validators.required),
            goodId: new FormControl('', Validators.required),
        }, [], checkForm);
    }

    static copyForm(date: Date, specialistId: number): FormGroup {
        return new FormGroup({
            specialistId: new FormControl(specialistId),
            dateFrom: new FormControl('', Validators.required),
            dateTo: new FormControl(HelpMe.dateToString(date), Validators.required)
        });
    }

    static shareForm(specialistId: number, date: string, checkDates: ValidatorFn): FormGroup {
        return new FormGroup({
            start: new FormControl('', Validators.required),
            end: new FormControl('', Validators.required),
            dateFrom: new FormControl(date, Validators.required),
            specialistId: new FormControl(specialistId, Validators.required),
            isWeekday: new FormControl(1, Validators.required)
        }, checkDates);
    }

    editForm(specialistId, checkForm: AsyncValidatorFn): FormGroup {
        return new FormGroup({
            id: new FormControl(this.id),
            specialistId: new FormControl(specialistId, Validators.required),
            date: new FormControl(this.date, Validators.required),
            time: new FormControl(HelpMe.timeToString(this.time), Validators.required),
            duration: new FormControl(this.duration, [Validators.required, Validators.min(0)]),
            price: new FormControl(this.price, [Validators.required, Validators.min(0)]),
            status: new FormControl(this.status, Validators.required),
            goodId: new FormControl(this.goodId, Validators.required),
        }, [], checkForm);
    }

    getMarginTop(): string {
        return (this.time.hours * 12 + this.time.minutes / 5) * 4 + 'px';
    }

    getHeight(): string {
        return this.duration / 5 * 4 + 'px';
    }
}
