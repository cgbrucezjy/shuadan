import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { Route } from '../core';
import { AdminPortalComponent } from './admin-portal.component';


const routes: Routes = [
  Route.withShell([
    { path: 'adminhqs', component: AdminPortalComponent, data: { title: "Admin" } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule { }
