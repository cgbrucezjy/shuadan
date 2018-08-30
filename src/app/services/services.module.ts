import { NgModule } from '@angular/core';
import { sdFirebase } from '../services/sd-firebase';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthService } from './authentication-service';
import { UserService } from './user-service';
@NgModule({
  declarations: [
  ],
  providers: [
    sdFirebase,
    AuthService,
    UserService
  ],
  exports:[
  ]
})
export class ServiceModule { }
