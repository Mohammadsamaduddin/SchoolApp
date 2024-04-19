import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent {
  public students: any = [];
  public pageNo: string = '';
  public limit: number = 0;
  public column: string = '';
  public order: string = '';
  public term: string = '';
  public queries: any = {
    filter : '',
    pageNo: 0,
    limit: 7,
    sortBy: '',
    order: ''

  }
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

  pageChange() {
    this._studentService.getPagedStudents(this.pageNo).subscribe(
      (data: any) => {
        this.students = data;
        alert("yes");
      },
      (err: any) => {
        alert("internal server down");
      }
    )
  }

  sortChange() {
    this._studentService.getSortedStudents(this.column, this.order).subscribe(
      (data: any) => {
        this.students = data;
      },
      (err: any) => {
        alert("internal server down");
      }
    )
  }

  filter() {
    this._studentService.getFilteredStudents(this.term).subscribe(
      (data: any) => {
        this.students = data;
      },
      (err: any) => {
        alert("server dowm");
      }
    )
  }

  load() {
    this._studentService.loadData(this.queries).subscribe(
      (data: any) => {
        this.students = data;
      },
      (err: any) => {
        alert("Website down");
      }
    )
  }
}
