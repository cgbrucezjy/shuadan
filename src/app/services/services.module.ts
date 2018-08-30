import { NgModule } from '@angular/core';
import { sdFirebase } from '../services/sd-firebase';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthService } from './authentication-service';
@NgModule({
  declarations: [
  ],
  providers: [
    sdFirebase,
    AuthService
  ],
  exports:[
  ]
})
export class ServiceModule { }
