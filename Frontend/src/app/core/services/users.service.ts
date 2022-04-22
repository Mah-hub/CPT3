import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

 
  baseurl = "http://localhost:8000"
  accessToken= localStorage.getItem("JWT_TOKEN")!
  //httpHeaders = new HttpHeaders({'Content-Type' : 'application/json', Authorization: "Bearer " +this.accessToken.replace(/\"/g, "")});
  //httpHeaders2 = new HttpHeaders({"Content-Type": "multipart/form-data", Authorization: "Bearer " +this.accessToken.replace(/\"/g, "")});

  constructor(private http:HttpClient) {

  }


  getAllUsers():Observable<any>{
    return this.http.get(this.baseurl + '/api/auth/users')
  }

  getOneUser(id):Observable<any>{
    return this.http.get(this.baseurl + '/api/auth/users/'+id)
  }

  updateUser(data):Observable<any>{
    return this.http.put(this.baseurl + '/api/auth/users/' + data.id + '/' , data  );
  }


  profile():Observable<any>{
    return this.http.get(this.baseurl + '/api/auth/profile')
  }
  

  updateProfile(data):Observable<any>{
   
    return this.http.put(this.baseurl + '/api/auth/profile' , data  );
  }

  updateProfileAfterSuccess(data):Observable<any>{
   
    return this.http.patch(this.baseurl + '/api/auth/profileaftersuccess' , data  );
  }


  updateProfileAvatar(mImage){
    
    const formData = new FormData();
    formData.append('image', mImage);
    return this.http.put(this.baseurl + '/api/auth/profileavatar/', formData)
  }




  updatepassword(data):Observable<any>{
    return this.http.put(this.baseurl + '/api/auth/change-password/' , data  );
  }

  addNewUserViaEmail(data):Observable<any>{
  return this.http.post(this.baseurl+ '/api/auth/registeruserviaemail' , data  )
  }

  checkUsernameExist(data):Observable<any> {
    return this.http.post(this.baseurl + '/api/auth/usernameexist',data)
  }
  
  loggedInUserPermissions():Observable<any> {
    return this.http.get(this.baseurl +'/api/auth/loggedinuserpermissions')
  }


  }