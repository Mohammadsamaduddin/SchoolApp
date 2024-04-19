import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent {
  public students: any = [];
  constructor(private _studentService: StudentService) {
    _studentService.getStudents().subscribe(
      (data: any) => {
        this.students = data;
      },
      (err: any) => {
        alert("internal server down");
      }
    )
  }

}
