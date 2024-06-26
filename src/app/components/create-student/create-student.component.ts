import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { max, min } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent {
  public create: any = [];
  public id: any = '';
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
        education: new FormArray([]),
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
  constructor(private _studentService: StudentService, private _activatedRoute: ActivatedRoute) {
    _activatedRoute.params.subscribe(
      (data: any) => {
        this.id = data.id;
        _studentService.eachStudent(this.id).subscribe(
          (data: any) => {
            this.studentform.patchValue(data);
          }
          
        )

      }
    )
  


    this.studentform.get('sourcetype')?.valueChanges.subscribe(
    (data: any) => {

      if (data == 'direct') {
        //add busFee
        this.studentform.addControl('sourcefrom', new FormControl());
        this.studentform.removeControl('referralname');
      }
      else {
        this.studentform.addControl("referralname", new FormControl());
        this.studentform.removeControl("sourcefrom");
      }
    }
  )
  }




  get educationFormArray() {
  return this.studentform.get('education') as FormArray;
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
  if(this.id){
    this._studentService.updateStudent(this.id,this.studentform.value).subscribe(
      (data:any)=>{
        this.studentform.reset();
        alert("edited");
      },
      (err:any)=>{
        alert("not edited");
      }
    )
  }
  else{
    this._studentService.createStudent(this.studentform.value).subscribe(
      (data: any) => {
        this.create = data;
        alert('created successfully');
        this.studentform.reset();
      },
      (err: any) => {
        alert('not created');
      }
    )
  }
  // console.log(this.studentform.value);
  
}
}

