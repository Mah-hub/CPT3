import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/auth.service';
import { MustMatch } from './validation.mustmatch';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.scss']
})
export class UpdatepasswordComponent implements OnInit {

  resetForm: FormGroup;
  submitted = true;
  error = '';
  success = '';
  loading = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {

    this.resetForm = this.formBuilder.group({
      newpassword: ['', [Validators.required,Validators.minLength(8) ]],
      confirmnewpassword: ['', Validators.required ] },{
        validator: MustMatch('newpassword', 'confirmnewpassword'),
      });

     this.submitted = false;

  }


  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }
 
  validSubmit() {
    this.submitted = true;
  }

  onSubmit(){

    if (this.submitted==true){

      this.route.paramMap.subscribe(params => {
        console.log("params",params)
        let token = params.get('token')
        let u=params.get('u')
        let password=this.f.newpassword.value

        let data ={
          "password":password,
          "token":token,
          "uidb64":u

        }

        this.authenticationService.resetpassafteremail(data).subscribe(data=> {
          console.log("success", data)

        },
        err => {
          console.log("err",err)
        })
      

      })


   //   this.authenticationService.resetpassafteremail


    }
    else {
      console.log("bbbbbbbbbbbbbbbbbbbbbbbb")
    }
      }

  /**
   * On submit form
   */
  /* onSubmit() {
    this.success = '';
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
    if (environment.defaultauth === 'firebase') {
      this.authenticationService.resetPassword(this.f.email.value)
        .catch(error => {
          this.error = error ? error : '';
        });
    }
  } */
}