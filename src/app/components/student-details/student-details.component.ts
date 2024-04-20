import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent {
  public student : any= {};
  public id : any= '';
  constructor(private _studentService:StudentService){}
  getStudent(){
    this._studentService.eachStudent(this.id).subscribe(
      (data:any)=>{
        this.student = data;
      }
    )
  }
}
