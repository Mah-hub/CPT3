import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoLogoutService } from 'src/app/core/services/auto-logout.service';
import { UsersService } from 'src/app/core/services/users.service';
import { MustMatch } from './validation.mustmatch';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [AutoLogoutService]

})
export class ProfileComponent implements OnInit {

  validationform: FormGroup; // bootstrap validation form
  validationform2: FormGroup; // bootstrap validation form

  tooltipvalidationform: FormGroup; // bootstrap tooltip validation form
  typeValidationForm: FormGroup; // type validation form
  typeValidationForm2: FormGroup; // type validation form
  url ;

  constructor(public formBuilder: FormBuilder, private userService:UsersService,private autoLogoutService: AutoLogoutService) { }
  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Form submition
  submit: boolean;
  formsubmit: boolean;
  typesubmit: boolean;
  wrongOldPassword=false;

  user={
    "id":"",
    "username": "",
    "first_name":"",
    "last_name":"",
    "email":"",
    "created_at":"",
    "phone_number":"",
    "company":"",
    "last_login":"",
    "last_updated":"",
    "groups":[],
    "user_permissions":[]
  }

  hide=true;
  hide2=true;
  hide3=true;
  role="null";

userImage;
  ngOnInit() {
   
    document.body.addEventListener('mouseover',()=> this.reset());

    

    console.log("ZZZZZZZZZZZ",this.user)
    this.profile()
    this.breadCrumbItems = [{ label: 'Profile' }, { label: 'Update profile', active: true }];
    /**
     * Bootstrap validation form data
     */
    this.validationform = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      birthDate: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    

    });

    this.userService.profile().subscribe( data => {
      console.log("datax",data)
     
      
  
      this.validationform = this.formBuilder.group({
        username: [data.username, [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        firstName: [data.first_name, [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        lastName: [data.last_name, [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        phoneNumber: [data.phone_number, [Validators.required]],
        email: [data.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      });

      
    },err => console.log("err",err))
    


    this.typeValidationForm = this.formBuilder.group(
      
      {
      
      password: ['', [Validators.required]],
      newpassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmpwd: ['', Validators.required]
    }, {
        validator: MustMatch('newpassword', 'confirmpwd'),
      });
      this.typesubmit = false;


    }


    

  /**
   * Returns form
   */
  get form() {
    return this.validationform.controls;
  }

  /**
   * Returns the type validation form
   */
   get type() {
    return this.typeValidationForm.controls;
  }
  

  /**
   * Bootsrap validation form submit method
   */
  validSubmit() {
    this.submit = true;
  }

   /**
   * Type validation form submit data
   */
  
  typeSubmit() {
    this.typesubmit = true;
  }



 
profile()
{
  this.userService.profile().subscribe( data => {
    console.log("datay",data)
    this.user=data
    if(data.groups.length !=0) {
      this.role= data.groups["0"]["name"] 
    }
    this.userImage=data.image
  },err => console.log("err",err))
}

updateProfile() {
  
  if (this.validationform.valid) {

  let profileData = {
    'username' : this.form.username.value,
    'first_name':this.form.firstName.value,
    'last_name':this.form.lastName.value,
    'email':this.form.email.value,
    'phone_number':this.form.phoneNumber.value,

  }
  this.userService.updateProfileAfterSuccess(profileData).subscribe(
    data=> console.log("SSSSSSSSSSSSSSSSSSSss",data),
    err => console.log("RRRRRRRRRRRRRRRRRRRRRRRRRR",err)
  )

  console.log("YYYYYYYYYYYYYYYY",this.form.email.value)
}
}
  

updatePassword(){

  this.wrongOldPassword=false;

  if (this.typeValidationForm.valid) { 
  let passwordData = {
    'old_password':this.type.password.value,
    'new_password':this.type.newpassword.value
  }
this.userService.updatepassword(passwordData).subscribe(data => {
},
err => {
  console.log("errx",(err.error.old_password[0]))

  if (err.error.old_password[0]=='Wrong password.') {

    this.wrongOldPassword=true;

  }
  console.log("IIIIIIIIIIIIIIIIIIIIIIII",this.wrongOldPassword)
  
 



}

)
  }
}

onSelectFile(event) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = event.target.result;
    }
    
    this.userService.updateProfileAvatar(event.target.files[0]).subscribe(data=> {
    },err => console.log("ERRRRRr",err))

  }
}


public delete(){
  this.url = null;
}
submitImage() {
  
}

reset(){
  console.log("MOVED")
}
 
}
