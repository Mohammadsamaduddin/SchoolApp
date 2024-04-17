import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent {
  public studentform: FormGroup;
  constructor() {
    this.studentform = new FormGroup(
      {
        name: new FormControl(),
        gender: new FormControl(),
        mobile: new FormControl(),
        email: new FormControl(),
        batch: new FormControl(),
        address: new FormGroup(
          {
            city: new FormControl(),
            district: new FormControl(),
            state: new FormControl(),
            pin: new FormControl(),
          }
        )
      }
    )
  }


  onSubmit() {
    console.log(this.studentform.value);

  }
}

