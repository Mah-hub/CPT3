import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserslistComponent } from './userslist/userslist.component';
import { LoginattemptsComponent } from './loginattempts/loginattempts.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { WidgetModule } from '../../shared/widget/widget.module';
import { UIModule } from '../../shared/ui/ui.module';
import { UsersgridComponent } from './usersgrid/usersgrid.component';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AdvancedSortableDirective } from './loginattempts/advanced-sortable.directive';
import {DataTablesModule} from 'angular-datatables';
import { UsersdetailsComponent } from './userslist/usersdetails/usersdetails.component';
import { LoginattemptsdetailsComponent } from './loginattempts/loginattemptsdetails/loginattemptsdetails.component';
import { AgmCoreModule } from '@agm/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    UserslistComponent,
    UsersgridComponent,
    LoginattemptsComponent,
    AdvancedSortableDirective,
     AdvancedSortableDirective,
     UsersdetailsComponent,
     LoginattemptsdetailsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
    Ng2SearchPipeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE'
    }),
    
    
    
    

  ]
})
export class UsersModule { }
