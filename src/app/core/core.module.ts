import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import {MatToolbarModule,MatMenuModule, MatIconModule,MatButtonModule, MatSelectModule, MatFormFieldModule, MatOptionModule} from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './shell/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouteReusableStrategy } from './route/route-reusable-strategy';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { ServiceModule } from '../services/services.module';



@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatOptionModule,
    ServiceModule
  ],
  declarations: [
    HeaderComponent,
    ShellComponent
  ],
  providers: [
    AuthenticationGuard,
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    }
  ],
  exports:[
    ShellComponent,
    HeaderComponent
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}
