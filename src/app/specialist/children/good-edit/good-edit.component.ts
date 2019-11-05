import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { DataService } from 'src/app/_services/data.service';
import { Good } from 'src/app/_models/good';

@Component({
  selector: 'app-good-edit',
  templateUrl: './good-edit.component.html',
  styleUrls: ['./good-edit.component.scss'],
})
export class GoodEditComponent implements OnInit {
  form: FormGroup;
  constructor(private activatedRoute: ActivatedRoute, private dataSrvice: DataService, private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.goodId;
    this.dataSrvice.getGood(id)
      .subscribe(
        (g: Good) => this.form = g.editForm()
      );
  }

  submit() {
    if (this.form.valid) {
      this.dataSrvice.updateGood(this.form.value)
        .subscribe(
          (resp) => {
            if (resp != false) {
              this.dataSrvice.getGoods(this.form.value.specialistId);
              this.router.navigateByUrl('/specialist/' + this.form.value.specialistId + '/good');
            }
          }
        );
    }
  }

}
