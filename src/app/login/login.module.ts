import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule } from '@angular/material';
import { ServiceModule } from '../services/services.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    ServiceModule,
    LoginRoutingModule,
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
