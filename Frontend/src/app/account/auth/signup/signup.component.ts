import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';
import { UserProfileService } from '../../../core/services/user.service';
import { UsersService } from 'src/app/core/services/users.service';
import { MustMatch } from './validation.mustmatch';
import { Auth2Service } from 'src/app/core/services/auth2.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private usersService: UsersService, private activatedRoute: ActivatedRoute, private authService:Auth2Service) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => { 

      if (!params['u']) {
        this.router.navigate(['/account/login'])
      }
      let userdata = {
        username : params['u'] 
    }
    this.usersService.checkUsernameExist(userdata).subscribe(data=>{
      console.log("daaaaaaaaata",data)
      if (data!='true') {
        this.router.navigate(['/account/login'])
      }
      else{
        console.log("not true")
      }
    })
    
    },   
    
    )

    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      firstname: ['', Validators.required, ],
      lastname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmpassword'),
    });
    this.submitted=false
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
   onSubmit() {
     this.submitted=true

   let profileData ={
    'username':this.f.username.value,
    'first_name':this.f.firstname.value,
    'last_name':this.f.lastname.value,
    'password':this.f.password.value
    }



    

    if (this.signupForm.valid) {   
      // calling the authService and subscribe to its observable  

      this.activatedRoute.params.subscribe(params => { 

        this.authService.login(params['u'],"12345678test").pipe(first()).subscribe(
          data=> {
 
            this.usersService.updateProfile(profileData).subscribe(
              data=> {console.log("SSSSSSSSSSSSSSSSSSSss",data),
              console.log("SSSSSSSSSSSS2",profileData),
              

              this.router.navigate(["/dashboard"]);   
            },
              err => console.log("RRRRRRRRRRRRRRRRRRRRRRRRRR",err)
            )
          


           console.log("LOGINDATA1",data)
           this.router.navigate(["/dashboard"]);   
 
            console.log("LOGINDATA2",data)
            
          },
          err => {
          
           console.log("IIIIIIIIIIIIIIIIII",err)
          }
         
        )
           
         
          
           

        
        
    
      },   
      
      )

     


  } 

   }
  
  }