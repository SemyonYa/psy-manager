import { Time } from '@angular/common';
import { environment } from 'src/environments/environment';

export class HelpMe {
    static getImg(path) {
        return (path) ? environment.host + path : '/assets/icon/logo.svg';
    }

    static dateToString(date: Date) {
        const formatedY = date.getFullYear();
        const formatedM = (date.getMonth().toString().length === 1) ? '0' + (date.getMonth() * 1 + 1 * 1) : (date.getMonth() * 1 + 1 * 1);
        const formatedD = (date.getDate().toString().length === 1) ? '0' + date.getDate() : date.getDate();
        return formatedY + '-' + formatedM + '-' + formatedD;
    }

    static stringDateFormParams(y, m, d) {
        const formatedM = (m.toString().length === 1) ? '0' + m : m;
        const formatedD = (d.toString().length === 1) ? '0' + d : d;
        return y + '-' + formatedM + '-' + formatedD;
    }

    static timeToString(time: Time) {
        const formatedHour = (time.hours.toString().length === 1) ? '0' + time.hours : time.hours;
        const formatedMinutes = (time.minutes.toString().length === 1) ? '0' + time.minutes : time.minutes;
        return formatedHour + ':' + formatedMinutes;
    }

    static stringTimeFromParams(h, m) {
        const formatedHour = (h.toString().length === 1) ? '0' + h : h;
        const formatedMinutes = (m.toString().length === 1) ? '0' + m : m;
        return formatedHour + ':' + formatedMinutes;
    }

}
