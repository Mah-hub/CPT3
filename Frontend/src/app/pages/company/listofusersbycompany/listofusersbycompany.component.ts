import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-listofusersbycompany',
  templateUrl: './listofusersbycompany.component.html',
  styleUrls: ['./listofusersbycompany.component.scss']
})
export class ListofusersbycompanyComponent implements OnInit {

  constructor(private route : ActivatedRoute,private companyService: CompanyService) { }
  breadCrumbItems: Array<{}>;
  searchKey: string;
  dataSource = new MatTableDataSource<usersElements>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  //getdata;
  companyid;

  @ViewChild(MatSort ) sort: MatSort;


  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
    
    this.route.paramMap.subscribe(params => {

      console.log("params",params.get('id'))
      this.companyid= params.get('id')
      this.breadCrumbItems = [{ label: 'Company: '+this.companyid }];

      this.companyService.getCompanyUsers(params.get('id')).subscribe(
        data=> {
          this.dataSource.data=data["users"];
          console.log("4data",data["users"])
          this.dataSource.sort=this.sort;
         // this.getdata=data["users"]
        },err => {console.log("error",err)}
        
      )

  })

  }
  displayedColumns: string[] = ['username', 'email','role','status','actions'];  


  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }



}
