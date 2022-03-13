import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { rolesandpermissionsService } from 'src/app/core/services/rolesandpermissions.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  groupForm: FormGroup;
  submitted = false;
  listOfRoles;
  selectedRowIndex = -1;
  selectedRowIds: Set<number> = new Set<number>();
  selectedRowIds2: Set<number> = new Set<number>();

  groupInfo ={
    "id":"",
    "name":"",
    "permissions": []
  }

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
]

permissionsData2 =[]


highlight(row){

  this.permissionsData = [
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
  ]
  this.groupInfo.id=row.id
  this.groupInfo.name=row.name

  this.selectedRowIds.clear()
  this.selectedRowIds2.clear()

    this.selectedRowIndex = row.id;
    this.permissionsData2=row.permissions

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
  
     console.log("gggggggggggggggggggggg",this.permissionsData)
}


  constructor(private modalService: NgbModal,  private formBuilder: FormBuilder, private http:HttpClient, private rolesService:rolesandpermissionsService) { }


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Roles & Permissions' }];

    this.getallRoles()
    this.groupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });


  }


   /**
   * Open modal
   * @param content modal content
   */
    openModal(content: any) {
      this.modalService.open(content);
    }

    get form() {
      return this.groupForm.controls;
    }

 /**
   * Save user
   */
  saveRole() {
    if (this.groupForm.valid) {
      const bale = this.groupForm.get('name').value;
      this.modalService.dismissAll()
    }

    this.submitted = true

    
  }

  getallRoles() {

    this.rolesService.getAllRoles().subscribe(
      data=> {
        this.listOfRoles=data
        
      },
      err => {
        return console.log("err", err);
      }
    )
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

  


  onSubmit(){

    
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







    this.groupInfo.permissions=this.permissionsData2
    console.log("AAAAAAAAA",this.permissionsData2)

    console.log("FFFFFFFFFFF",this.groupInfo)
    this.rolesService.updateRole(this.groupInfo).subscribe(
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
