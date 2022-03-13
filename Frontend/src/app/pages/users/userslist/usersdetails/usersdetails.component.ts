import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/services/users.service';


@Component({
  selector: 'app-usersdetails',
  templateUrl: './usersdetails.component.html',
  styleUrls: ['./usersdetails.component.scss']
})

export class UsersdetailsComponent implements OnInit {
  validationform: FormGroup; // bootstrap validation form
  tooltipvalidationform: FormGroup; // bootstrap tooltip validation form
  typeValidationForm: FormGroup; // type validation form
   // Form submition
   submit: boolean;
   formsubmit: boolean;
   typesubmit: boolean;

   userUsername;
   userFirstName;
   userLastName;
   userCreatedAt;
   userLastLogin;
   userLastUpdatedAt;
   userImage;

   user={
     "id":"",
     "username": "",
     "first_name":"",
     "last_name":"",
     "email":"",
     "created_at":"",
     "last_login":"",
     "last_updated":"",
     "groups":[],
     
     "user_permissions":[]
   }


   selectedRowIds: Set<number> = new Set<number>();
   selectedRowIds2: Set<number> = new Set<number>();


   permissionsData = [
  {
      "id": 9,
      "name": "Can add group"
  },
  {
      "id": 10,
      "name": "Can change group"
  },
  {
      "id": 11,
      "name": "Can delete group"
  },
  {
      "id": 12,
      "name": "Can view group"
  },
  {
      "id": 21,
      "name": "Can add user"
  },
  {
      "id": 22,
      "name": "Can change user"
  },
  {
      "id": 23,
      "name": "Can delete user"
  },
  {
      "id": 24,
      "name": "Can view user"
  },
  {
      "id": 29,
      "name": "Can add product"
  },
  {
      "id": 30,
      "name": "Can change product"
  },
  {
      "id": 31,
      "name": "Can delete product"
  },
  {
      "id": 32,
      "name": "Can view product"
  },
  

    
    ];

    permissionsData2 = [
      {
        "id": 31,
        "name": "Can delete product"
    },
    {
        "id": 32,
        "name": "Can view product"
    },
   
     
     ];



  constructor(private route : ActivatedRoute, public formBuilder: FormBuilder,private userService:UsersService) { }
  breadCrumbItems: Array<{}>;


  ngOnInit(): void {

    this.breadCrumbItems = [{ label: 'Users' }, { label: 'User details', active: true }];
    this.route.paramMap.subscribe(params => {
      this.userService.getOneUser(params.get('id')).subscribe(       
        data=> {  
          this.user.id=data.id;
          this.user.username=data.username;
          this.user.first_name=data.first_name;
          this.user.last_name=data.last_name;
          this.user.email=data.email;
          this.user.groups=data.groups;
          this.user.user_permissions=data.user_permissions;
          this.user.created_at=data.created_at;
          this.user.last_login=data.last_login;
          this.user.last_updated=data.updated_at;
          this.userImage=data.image
          
          this.validationform = this.formBuilder.group({
            username: [this.user.username, [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            firstName: [this.user.first_name, [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            lastName: [this.user.last_name, [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            phoneNumber: [data.phone_number, [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            email: [data.email, [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            city: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            state: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            groups: [data.groups[0]['name'], [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            dateJoined: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            company: [data.company, [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            photo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            birthDate: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            title: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            location: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            superior: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      
          });
          

          this.permissionsData2=data["user_permissions"]
          let i: number = 0;
          while (i < this.permissionsData.length) {
            let j: number = 0;
            while (j < this.permissionsData2.length) {
              if (this.permissionsData[i]["name"] == this.permissionsData2[j]["name"]) {
                this.permissionsData.splice(i, 1);
              }
              j++
            }
            i++
          }
        }
      )

      this.validationform = this.formBuilder.group({
        username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        phoneNumber: ['', [ Validators.pattern('[a-zA-Z0-9]+')]],
        email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        city: ['', [ Validators.pattern('[a-zA-Z0-9]+')]],
        state: ['', [ Validators.pattern('[a-zA-Z0-9]+')]],
        groups : ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        dateJoined: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        company: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        photo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        birthDate: ['', [ Validators.pattern('[a-zA-Z0-9]+')]],
        title: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        location: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        superior: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
  
      });
    

    })

    this.submit = false;
    


  }
  

  onRowClick(id: number) {
    if(this.selectedRowIds.has(id)) {
     this.selectedRowIds.delete(id);
    }
    else {
      this.selectedRowIds.add(id);
    }
  }

  rowIsSelected(id: number) {
    return this.selectedRowIds.has(id);
  }

  getSelectedRows(){
    return this.permissionsData.filter(x => this.selectedRowIds.has(x.id));
  }

  onLogClick() {
    console.log(this.getSelectedRows);
  }




  onRowClick2(id: number) {
    console.log("id",id)
    if(this.selectedRowIds2.has(id)) {
     this.selectedRowIds2.delete(id);
    }
    else {
      this.selectedRowIds2.add(id);
      console.log("table",this.selectedRowIds2)
    }
  }

  rowIsSelected2(id: number) {
    return this.selectedRowIds2.has(id);
  }

  getSelectedRows2(){
    return this.permissionsData2.filter(x => this.selectedRowIds2.has(x.id));
  }

  onLogClick2() {
    
    console.log(this.getSelectedRows2());
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

  validate(){


      let filteredArray : any[] = [];
      let array = Array.from(this.selectedRowIds);
      
     for (var i = 0; i < array.length; i++) {
      var list = this.permissionsData.filter(x => x.id == array[i]);
      list.forEach(x => {
        let variableindex = this.permissionsData.indexOf(x)
        this.permissionsData.splice(variableindex,1)
         filteredArray.push(x);
      })
   }
   filteredArray.forEach(x=> { 
    this.permissionsData2.push(x)})







   let filteredArray2 : any[] = [];
   let array2 = Array.from(this.selectedRowIds2);
   
  for (var i = 0; i < array2.length; i++) {
   var list2 = this.permissionsData2.filter(x => x.id == array2[i]);
   list2.forEach(x => {
    let variableindex2 = this.permissionsData2.indexOf(x)
     this.permissionsData2.splice(variableindex2,1)
      filteredArray2.push(x);
   })
}
   filteredArray2.forEach(x=> { 
     this.permissionsData.push(x)})

     

     console.log("1111111111111111111111",this.permissionsData)
     console.log("2222222222222222222222",this.permissionsData2)






     this.permissionsData.forEach(x=> {
      let  g=this.permissionsData2.indexOf(x)
      if (g != -1) {
        let h = this.permissionsData.indexOf(x)
        this.permissionsData.splice(h,1)

      }
     })



this.user.user_permissions=this.permissionsData2
this.userService.updateUser(this.user).subscribe(
  data=> {
    console.log("success",data)
  },
  err => {
    console.log(err)
  }
)
    this.selectedRowIds.clear()
this.selectedRowIds2.clear()

    }

  

}
