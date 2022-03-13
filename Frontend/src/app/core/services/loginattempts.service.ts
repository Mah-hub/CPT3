import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginattemptsService {

 
  baseurl = "http://localhost:8000"
  accessToken= localStorage.getItem("JWT_TOKEN")!
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json', Authorization: "Bearer " +this.accessToken.replace(/\"/g, "")});

  constructor(private http:HttpClient) { }

  getAllLoginAttempts():Observable<any>{
    return this.http.get(this.baseurl + '/api/loginattempts',)
  }

  getOneAttempt(id):Observable<any>{
    return this.http.get(this.baseurl + '/api/loginattempts/'+id,)
  }

}
