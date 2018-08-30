import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { ComponentsModule } from '../components/components.module';
import { ServiceModule } from '../services/services.module';
import { AdminPortalComponent } from './admin-portal.component';
import { AdminRoutingModule } from './admin-portal-routing.module';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ComponentsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminPortalComponent
  ],
  providers: [
    ServiceModule
  ],
  exports:[
  ]
})
export class AdminProtalModule { }
