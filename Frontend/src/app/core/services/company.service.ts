import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseurl = "http://localhost:8000"
  constructor(private http:HttpClient) {

  }


  getAllCompanies():Observable<any>{
    return this.http.get(this.baseurl + '/api/companies/get')
  }

  getOneCompany(id):Observable<any>{
    return this.http.get(this.baseurl + '/api/companies/get/'+id,)
  }

  addNewCompany(data):Observable<any>{
    return this.http.post(this.baseurl + '/api/companies/post/' , data)
  }

  addNewManagerViaEmail(data):Observable<any>{
    return this.http.post(this.baseurl+ '/api/auth/registermanagerviaemail' , data  )
    }
  getCompanyUsers(id):Observable<any>{
      return this.http.get(this.baseurl+ '/api/companies/getusers/' +id, )
      }
    
  addUserstoCompany(id,data):Observable<any>{

    return this.http.patch(this.baseurl+ '/api/companies/post/'+id + '/' , data  )

  }

  updateCompany(id,data):Observable<any>{

    return this.http.patch(this.baseurl+ '/api/companies/post/'+id + '/' , data  )

  }

  updateCompanyLogo(id,mImage){
    
    const formData = new FormData();
    formData.append('image', mImage);
    return this.http.patch(this.baseurl +'/api/companies/post/'+id + '/' , formData )
  }

  updateUserCompany(id,data) {

    return this.http.patch(this.baseurl+ '/api/auth/users/'+id + '/' , data  )

  }

  getMyCompany():Observable<any>{
    return this.http.get(this.baseurl+ '/api/companies/mycompany' )
    }

  }