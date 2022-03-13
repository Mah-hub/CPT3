import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class rolesandpermissionsService {


 
  baseurl = "http://localhost:8000"

  selectedRowIds: Set<number> = new Set<number>();
  
  constructor(private http:HttpClient) {

  }


  getAllRoles():Observable<any>{
    return this.http.get(this.baseurl + '/api/auth/groups',)
  }

  updateRole(data):Observable<any>{
    return this.http.put(this.baseurl + '/api/auth/groups/' + data.id + '/' , data , );
  }

 


  }