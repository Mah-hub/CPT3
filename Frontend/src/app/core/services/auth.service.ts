import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';

const httpOptions= {
    headers : new HttpHeaders({
        'content-type': 'application/json'
    })
  };

export class User {
  
    username: string;
    token?: string;
}

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    
  baseurl = "http://localhost:8000"
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

    constructor(private http:HttpClient, private router : Router) {  
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    
    }
    public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  

    login (username:string, password:string) {
        return this.http.post<any>(this.baseurl+'/api/auth/login',{username,password},
        httpOptions).pipe(map(user => {

          if ( user && user.tokens) 
    
          {
            console.log("user",user, user.tokens)
            localStorage.setItem("currentUserToken",JSON.stringify(user.tokens.access))
            localStorage.setItem("currentUser",JSON.stringify(user))  
            localStorage.setItem("refreshtoken",JSON.stringify(user.tokens.refresh))  
            this.router.navigate(['/dashboard']);
          }
          return user;
        },
        err => {
          console.log("fail",err) }
        ) 
        );
      }

  getIpAddress() {
        return this.http
              .get('https://api.ipify.org/?format=json')
              .pipe(
                catchError(this.handleError)
              );
      } 
      
      
    getGEOLocation(ip) {
        // Update your api key to get from https://ipgeolocation.io
        let url = "https://api.ipgeolocation.io/ipgeo?apiKey=1c86f940c79b413891a1b262a98dcc3c&ip="+ip; 
          return this.http
                .get(url)
                .pipe(
                  catchError(this.handleError)
                );
    } 

    
postLoginAttempt (data) {
  console.log("daaaaataratara",data)
  return this.http.post(this.baseurl+'/api/loginattempts/',data)

}

      

private handleError(error: HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
          }
          // return an observable with a user-facing error message
          return throwError(
            'Something bad happened; please try again later.');
        }


      sendemail(email):Observable<any>{
          const data= {'email':email}
          return this.http.post(this.baseurl + '/api/auth/request-reset-email/', data)
        
        }

      resetpassafteremail(data):Observable<any>{   
          return this.http.patch(this.baseurl + '/api/auth/password-reset-complete/', data)
        }

        logout() {
          // remove user from local storage to log user out
          this.router.navigate(['/account/login']);
          localStorage.removeItem('currentUser');
          localStorage.removeItem('currentUserToken');
          this.currentUserSubject.next(null);
      }
   
}

