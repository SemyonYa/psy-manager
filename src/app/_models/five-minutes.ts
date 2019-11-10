export class FiveMinutes {
    n: number;
    hour: number;
    minutes: number;
    seance: number;
    good: string;
    isStart: boolean;
    isEnd: boolean;

    constructor(n: number, hour: number, minutes: number, seance: number, good: string, isStart: boolean, isEnd: boolean) {
        this.n = n;
        this.hour = hour;
        this.minutes = minutes;
        this.seance = seance;
        this.good = good;
        this.isStart = isStart;
        this.isEnd = isEnd;
    }
}
