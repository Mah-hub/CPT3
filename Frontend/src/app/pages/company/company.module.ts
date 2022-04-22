import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbDropdownModule, NgbPaginationModule, NgbTooltipModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataTablesModule } from 'angular-datatables';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { CompanydetailsComponent } from './companydetails/companydetails.component';
import { ListofusersbycompanyComponent } from './listofusersbycompany/listofusersbycompany.component';
import { MycompanyComponent } from './mycompany/mycompany.component';



@NgModule({
  declarations: [
    CompanyComponent,
    CompanydetailsComponent,
    ListofusersbycompanyComponent,
    MycompanyComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgSelectModule,
    WidgetModule,
    UIModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    Ng2SmartTableModule,
    NgbCollapseModule,
    DataTablesModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule
    
  ]
})
export class CompanyModule { }
