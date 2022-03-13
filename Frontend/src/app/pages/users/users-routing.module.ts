import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginattemptsComponent } from './loginattempts/loginattempts.component';
import { LoginattemptsdetailsComponent } from './loginattempts/loginattemptsdetails/loginattemptsdetails.component';
import { UsersgridComponent } from './usersgrid/usersgrid.component';
import { UsersdetailsComponent } from './userslist/usersdetails/usersdetails.component';
import { UserslistComponent } from './userslist/userslist.component';

const routes: Routes = [
  
  { path: 'userslist', component: UserslistComponent },
  { path: 'userdetails/:id', component: UsersdetailsComponent },  
  { path: 'usersgrid', component: UsersgridComponent },
  { path: 'loginattempts', component: LoginattemptsComponent },
  { path: 'loginattemptdetails/:id', component: LoginattemptsdetailsComponent },  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
