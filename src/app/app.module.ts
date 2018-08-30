import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AdminProtalModule } from './admin-portal/admin-portal.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { LoginModule } from './login/login.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/app.effects';
import { PrivacyModule } from './privacy/privacy.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    CoreModule,
    HomeModule,
    LoginModule,
    PrivacyModule,
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forRoot(reducers),
    AdminProtalModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
