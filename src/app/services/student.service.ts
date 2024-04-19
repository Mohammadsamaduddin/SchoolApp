import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private _httpClient: HttpClient) {
  }
  createStudent(data: any): Observable<any> {
    return this._httpClient.post("https://62b9299dff109cd1dc8ca34f.mockapi.io/students", data);
  }

  getStudents(): Observable<any> {
    return this._httpClient.get("https://62b9299dff109cd1dc8ca34f.mockapi.io/students");
  }

  getPagedStudents(pageNo:string):Observable<any>{
    return this._httpClient.get("https://62b9299dff109cd1dc8ca34f.mockapi.io/students?limit=5&page="+ pageNo);
  }
}
