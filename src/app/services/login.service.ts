import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _httpClient: HttpClient) { }
  logIn(data:string):Observable<any>{
    return this._httpClient.post("https://reqres.in/api/login",data);
  }
}
