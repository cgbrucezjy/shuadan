import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SdCardComponent } from './sd-card/sd-card.component';
import { MatCardModule, MatButtonModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatProgressBarModule } from '@angular/material';
import { BougtDialogComponent } from './bougt-dialog/bougt-dialog.component';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { ServiceModule } from '../services/services.module';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { CommonModule } from '@angular/common';
import { VenmoDialogComponent } from './venmo-dialog/venmo-dialog.component';


@NgModule({
  declarations: [
    SdCardComponent,
    BougtDialogComponent,
    UpdateDialogComponent,
    VenmoDialogComponent
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressBarModule,
    ServiceModule,
    BrowserModule,
    CommonModule
  ],
  providers: [
    ServiceModule
  ],
  exports:[
    SdCardComponent,
    
  ],
  entryComponents:[
    BougtDialogComponent,
    UpdateDialogComponent,
    VenmoDialogComponent
  ]
})
export class ComponentsModule { }
