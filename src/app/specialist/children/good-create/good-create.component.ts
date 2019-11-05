import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataService } from 'src/app/_services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Good } from 'src/app/_models/good';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-good-create',
  templateUrl: './good-create.component.html',
  styleUrls: ['./good-create.component.scss'],
})
export class GoodCreateComponent implements OnInit {
  form: FormGroup;
  specialistId: number;
  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.specialistId = this.activatedRoute.snapshot.parent.params.id;
    this.form = Good.createForm(this.specialistId);
  }

  submit() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.dataService.newGood(this.form.value)
        .subscribe(
          (resp) => {
            if (resp != false) {
              this.dataService.getGoods(this.specialistId);
              this.router.navigateByUrl('/specialist/' + this.specialistId + '/good');
            }
          }
        );
    }
  }

}
