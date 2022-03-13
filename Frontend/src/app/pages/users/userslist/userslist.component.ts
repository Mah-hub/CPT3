import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss']
})

/**
 * Contacts user-list component
 */
export class UserslistComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  userForm: FormGroup;
  selected;
  users;
  submitted = false;
  typesubmit: boolean;
  selectValue: string[];
  

  constructor(private modalService: NgbModal,  private formBuilder: FormBuilder, private http:HttpClient, private usersService:UsersService) { }

  ngOnInit() {
    
    this.breadCrumbItems = [{ label: 'Users' }, { label: 'Users List', active: true }];

    this.usersService.getAllUsers().subscribe(
      data=> {
        this.users = data;
        console.log("datax",this.users);
        
      }
    )

    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      
    });
    this.typesubmit = false;



   
  }

  get type() {
    return this.userForm.controls;
  }
  typeSubmit() {
    this.typesubmit = true;
  }


   /**
   * Open modal
   * @param content modal content
   */
    openModal(content: any) {
      this.modalService.open(content);
    }

    get form() {
      return this.userForm.controls;
    }

 /**
   * Save user
   */
  saveUser() {
    if (this.userForm.valid) {
      
      let  possible ="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz"
      let username = "";
      for (let i = 0; i < 32; i++) {
      username += possible.charAt(Math.floor(Math.random() * possible.length));
        }
    
      const email = this.userForm.get('email').value;

      let data = {
        
        "username":username,
        "email":email,
        "password":"12345678test",
    
    }

      this.usersService.addNewUserViaEmail(data).subscribe(data=> {
        console.log("xxxxxxx",data)
      },
      err => { console.log("yyyyyyyyyyy",err)}
      )
      this.modalService.dismissAll()
    }

    
  }

  baseurl = "http://localhost:8000"
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json', Authorization: "Token " +"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuQ29tIiwiZXhwIjoxNjM5NTU1MzY1fQ.z1XrpGgNLQD0BqwU6yeS3zeFU6oFh7kyyjyecHhsL3E"});


  getAllUser2s():Observable<any>{
    return this.http.get(this.baseurl + '/api/auth/users',{headers :this.httpHeaders})
  }
  getdata() {

    console.log(this.userForm.valid)
  }

 
 

}
