import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent {
  public studentform: FormGroup;
  constructor() {
    this.studentform = new FormGroup
      (
        {
          name: new FormControl(),
          gender: new FormControl(),
          mobile: new FormControl(),
          email: new FormControl(),
          batch: new FormControl(),
          address: new FormGroup
            (
              {
                city: new FormControl(),
                district: new FormControl(),
                state: new FormControl(),
                pin: new FormControl()
              }
            ),
          educations: new FormArray([]),
          company : new FormGroup(
            {
              name : new FormControl(),
              location : new FormControl(),
              package : new FormControl(),
              offerdate : new FormControl()

            }
          ),
          souceType: new FormControl()
        }
      )

  }
  get educationFormArray() {
    return this.studentform.get('educations') as FormArray;
  }

  addEducation() {
    this.educationFormArray.push(
      new FormGroup(
        {
          qualification : new FormControl(),
          year : new FormControl(),
          percentage : new FormControl()
        }
      )
    )
  }

  onDelete(i:number){
   this.educationFormArray.removeAt(i);
  }

  onSubmit() {
    console.log(this.studentform.value);
  }
}

