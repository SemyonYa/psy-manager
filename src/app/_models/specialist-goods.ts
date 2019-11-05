import { Specialist } from './specialist';
import { Good } from './good';

export class SpecialistGoods {
    specialist: Specialist;
    goods: Good[];

    constructor(specialist: Specialist, goods: Good[]) {
        this.specialist = specialist;
        this.goods = goods;
    }
}


