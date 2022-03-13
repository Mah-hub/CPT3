import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import * as Bowser from 'bowser';
import { Auth2Service } from 'src/app/core/services/auth2.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */

export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  userInfo = 
    {"username":"",
    "password":"" }
  loginAttemptData;
  getIpAdd;
  country;
  countryflag;
  countrytld;
  capital;
  isp;
  organisation;
  lat;
  lng;
  currencycode;
  currencyname;
  currencysymbol;
  todayString : string = new Date().toISOString();
  browser = Bowser.getParser(window.navigator.userAgent);
  wrongattempt=false;
  hide =true;
  
  

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private authService:AuthenticationService,private auth2Service:Auth2Service,private router: Router) { }

  ngOnInit() {
    this.getIPAddress()
    this.loginForm = this.formBuilder.group({
      username: [this.userInfo.username, [Validators.required]],
      password: [this.userInfo.password, [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  Submit(){
    this.submitted=true
  }

  onSubmit() {

    this.wrongattempt=false;


    this.loginAttemptData ={
      "username":this.f.username.value,
      "password":this.f.password.value,
      "date":this.todayString,
      "ipaddress":this.getIpAdd,
      "browsername":this.browser.getBrowser()["name"],
      "browserversion":this.browser.getBrowser()["version"],
      "countryname":this.country,
      "countryflag":this.countryflag,
      "countrytld":this.countrytld,
      "capital": this.capital,
      "isp":this.isp,
      "organisation":this.organisation,
      "lat":this.lat,
      "lng":this.lng,
      "currencycode":this.currencycode,
      "currencyname":this.currencyname,
      "currencysymbol":this.currencysymbol

    
    }


    this.authService.postLoginAttempt(this.loginAttemptData).subscribe(
      data => {
      

         },
      err => {


      }
    ) 
    




    if (this.loginForm.valid) {   
      // calling the authService and subscribe to its observable  

       this.auth2Service.login(this.f.username.value,this.f.password.value).pipe(first()).subscribe(
         data=> {

          console.log("LOGINDATA1",data)
          this.router.navigate(["/dashboard"]);   

           console.log("LOGINDATA2",data)
           
         },
         err => {
          this.wrongattempt=true;
          console.log("IIIIIIIIIIIIIIIIII",err)
         }
        
       )
          }
          // else condition to check if the form is not valid
          else{
        
         }
          }


          
  getIPAddress() {
    this.authService.getIpAddress().subscribe(
      data => {
      this.getIpAdd=data['ip'] 
      this.authService.getGEOLocation(this.getIpAdd).subscribe(
        data => {
          this.country=data["country_name"]
          this.countryflag=data["country_flag"]
          this.countrytld=data["country_tld"]
          this.capital=data["country_capital"]
          this.isp=data["isp"]
          this.organisation=data["organization"]
          this.lat=data["latitude"]
          this.lng=data["longitude"]
          this.currencycode=data["currency"]["code"]
          this.currencyname=data["currency"]["name"]
          this.currencysymbol=data["currency"]["symbol"]
          console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKk",data)
        }
      )


      }


    )
  }



  


    

}
