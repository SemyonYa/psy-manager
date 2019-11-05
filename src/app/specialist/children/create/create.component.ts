import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/_services/data.service';
import { Specialist } from 'src/app/_models/specialist';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.form = Specialist.createForm(this.checkName.bind(this));
  }

  submit() {
    console.log(this.form);
    if (this.form.valid) {
      this.dataService.newSpecialist(this.form.value)
        .subscribe(
          (resp) => {
            if (resp != false) {
              this.dataService.getSpecialists();
              this.router.navigateByUrl('/specialist');
            }
          }
        );
    }
  }

  checkName(nameControl: FormControl): Observable<any> {
    return this.dataService.checkSpecialistCreateName(nameControl.value);
  }

}
