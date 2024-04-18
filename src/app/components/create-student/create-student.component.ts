import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent {
  public studentform: FormGroup = new FormGroup
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
        company: new FormGroup(
          {
            name: new FormControl(),
            location: new FormControl(),
            package: new FormControl(),
            offerdate: new FormControl()

          }
        ),
        sourcetype: new FormControl(),
      }
    )
  constructor() {
    this.studentform.get('sourcetype')?.valueChanges.subscribe(
      (data: any) => {

        if (data == 'direct') {
          //add busFee
          this.studentform.addControl('sourcefrom', new FormControl());          //remove hostelFee
          this.studentform.removeControl('referralname');
        }
        else {
          //add hostelFee
          this.studentform.addControl("referralname", new FormControl());
          //reomove busFee
          this.studentform.removeControl("sourcefrom");
        }
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
          qualification: new FormControl(),
          year: new FormControl(),
          percentage: new FormControl()
        }
      )
    )
  }

  onDelete(i: number) {
    this.educationFormArray.removeAt(i);
  }

  onSubmit() {
    console.log(this.studentform.value);
  }
}

