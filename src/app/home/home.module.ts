import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ComponentsModule } from '../components/components.module';
import { MatGridListModule, MatIconModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { sdFirebase } from '../services/sd-firebase';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ServiceModule } from '../services/services.module';
import { FlexLayoutModule } from "@angular/flex-layout";
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ComponentsModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    HomeRoutingModule,
    ServiceModule,
    FlexLayoutModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    ServiceModule
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
