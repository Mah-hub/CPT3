import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from 'src/app/core/services/company.service';

export interface companyElements {
  id: string;
  name: string;
  email:string;
  image:string;
  actions:string;

  
}

 
const ELEMENT_DATA: companyElements[] = [];



@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  companyForm: FormGroup;
  breadCrumbItems: Array<{}>;
  getdata;
  typesubmit: boolean;

  dataSource = new MatTableDataSource<companyElements>(ELEMENT_DATA);
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

@ViewChild(MatSort ) sort: MatSort;


  constructor(private companyService:CompanyService,private modalService: NgbModal,private formBuilder: FormBuilder) { }
  searchKey: string;

  ngOnInit(): void {

    this.breadCrumbItems = [{ label: 'Companies' }];
    this.getallCompanies()
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;

    this.companyForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      manager: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      
    });
    this.typesubmit = false;


  }
  displayedColumns: string[] = ['id', 'name','email','image','actions'];  

  getallCompanies() {

    this.companyService.getAllCompanies().subscribe(
      data=> {

        console.log(data)
        this.dataSource.data=data;
        this.dataSource.sort=this.sort;
        this.getdata=data

      },err => {console.log("error",err)}
    )
    

    
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }


  /**
   * Open modal
   * @param content modal content
   */
   openModal(content: any) {
    this.modalService.open(content);
  }

  get type() {
    return this.companyForm.controls;
  }

  typeSubmit() {
    this.typesubmit = true;
  }

  saveCompany() {

  }


  registerNewManager() {
    if (this.companyForm.valid) {
      
     
    
      const email = this.companyForm.get('email').value;
      const manager = this.companyForm.get('manager').value;
      const code = this.companyForm.get('code').value;
      const name = this.companyForm.get('name').value;


      let managerdata = {
        
        "username":manager,
        "email":email,
        "password":"12345678test",
    
    }

   

      this.companyService.addNewManagerViaEmail(managerdata).subscribe(data=> {
        console.log("xxxxxxx",data)
        let newumanagerid=data["id"]
        console.log("DATAManager",newumanagerid)

        let companydata = {
        
          "id":code,
          "name":name,
          "manager":newumanagerid,
          
      
      }


        this.companyService.addNewCompany(companydata).subscribe(data=> {
          console.log("Company created",data["id"])
          let companyid = data["id"]
          let firstuser = 
          {
           users : [newumanagerid]

          }

          this.companyService.addUserstoCompany(data["id"],firstuser).subscribe
          (data => {
            console.log("user added to company")
            let companyuser ={
              company: companyid
            }

            this.companyService.updateUserCompany(newumanagerid,companyuser).subscribe(
              data=> {
                console.log(data,"User updated the company")
                this.modalService.dismissAll()
                window.location.reload();
              },
              err => { console.log(err,"user not updated the company")}
            )
            
          },err=>{console.log("problem with adding user to company",err)})


          this.modalService.dismissAll()
        

        },err => {console.log("err, company failed to be created",err)
      
        this.modalService.dismissAll()}
        
        )



      },
      err => { console.log("yyyyyyyyyyy",err)
      this.modalService.dismissAll()
    }
      
      )
     
    }
    
  }

}
