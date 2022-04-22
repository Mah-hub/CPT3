import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyService } from 'src/app/core/services/company.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface usersElements {
  id:string;
  username: string;
  email: string;
  role:string;
  status:string;
  actions:string;
  

  
}



const ELEMENT_DATA: usersElements[] = [];


@Component({
  selector: 'app-mycompany',
  templateUrl: './mycompany.component.html',
  styleUrls: ['./mycompany.component.scss']
})
export class MycompanyComponent implements OnInit {

  constructor(private companyService:CompanyService) { }
  breadCrumbItems: Array<{}>;
  searchKey: string;
  dataSource = new MatTableDataSource<usersElements>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort ) sort: MatSort;

  getdata;

  displayedColumns: string[] = ['username', 'email','role','status','actions'];  


  ngOnInit(): void {
    this.getMyCompany()
  }



  getMyCompany() {
    this.companyService.getMyCompany().subscribe(
      data=> {
        console.log("OUIOUI",data)
        this.dataSource.data=data["users"]
        this.dataSource.sort=this.sort;
       
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


}
