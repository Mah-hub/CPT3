import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanydetailsComponent } from './companydetails/companydetails.component';
import { ListofusersbycompanyComponent } from './listofusersbycompany/listofusersbycompany.component';
import { MycompanyComponent } from './mycompany/mycompany.component';

const routes: Routes = [{ path: '', component: CompanyComponent },
{ path: 'companydetails/:id', component: CompanydetailsComponent },  
{ path: 'listofusersbycompany/:id', component: ListofusersbycompanyComponent },  
{ path: 'mycompany', component: MycompanyComponent },  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
