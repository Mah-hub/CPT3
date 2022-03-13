import { Component, OnInit} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Table } from './advanced.model';
import { AdvancedService } from './advanced.service';
import { LoginattemptsService } from 'src/app/core/services/loginattempts.service';

@Component({
  selector: 'app-loginattempts',
  templateUrl: './loginattempts.component.html',
  styleUrls: ['./loginattempts.component.scss'],
  providers: [AdvancedService, DecimalPipe]
})

/**
 * Advanced table component
 */
export class LoginattemptsComponent implements OnInit {
  term;
  // bread crum data
  breadCrumbItems: Array<{}>;
  // Table data
  tableData: Table[];
  public selected: any;
  hideme: boolean[] = [];
  tables$: Observable<Table[]>;
  total$: Observable<number>;
  editableTable: any;
  loginAttemptsData;
  loginAttemptsData2;

   // page number
   page = 1;
   // default page size
   pageSize = 10;
   // total number of records
   totalRecords = 0;
 
   // start and end index
   startIndex = 1;
   endIndex = 10;
 
  constructor( private loginattemptsService : LoginattemptsService ) {
   
  }


  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Users' }, { label: 'Login attempts', active: true }];
    /**
     * fetch data
     */
    this.getAllLoginAttempts()

  }


getAllLoginAttempts() {
  this.loginattemptsService.getAllLoginAttempts().subscribe(
    data => {
      this.loginAttemptsData=data
      console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIII',data)
      this.totalRecords = this.loginAttemptsData.length;
      this.loginAttemptsData2=this.loginAttemptsData.slice(this.startIndex - 1, this.endIndex );

    }
  )
}

onPageChange(page: any): void {
  console.log("pagesize",this.pageSize)
  this.startIndex = (page - 1) * this.pageSize + 1;
  this.endIndex = (page - 1) * this.pageSize + this.pageSize;
  if (this.endIndex > this.totalRecords) {
    this.endIndex = this.totalRecords;
  }
  console.log("JJJJJJJJJJJJJJJJJJJJJJJJJJ",this.loginAttemptsData)
  this.loginAttemptsData2 = this.loginAttemptsData.slice(this.startIndex - 1, this.endIndex );
}


}
