import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { max, min } from 'rxjs';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent {
  public studentform: FormGroup = new FormGroup
    (
      {
        name: new FormControl(null, [Validators.required]),
        gender: new FormControl(null, [Validators.required]),
        mobile: new FormControl(null, [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
        email: new FormControl(null, [Validators.required]),
        batch: new FormControl(null, [Validators.required]),
        address: new FormGroup
          (
            {
              city: new FormControl(),
              mandal: new FormControl(),
              district: new FormControl(null, [Validators.required]),
              state: new FormControl(),
              pincode: new FormControl(null, [Validators.required, Validators.min(100000), Validators.max(999999)]),
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
          percentage: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)])
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

