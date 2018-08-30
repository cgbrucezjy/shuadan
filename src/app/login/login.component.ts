import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { AuthService } from '../services/authentication-service';
import { Store, State, select } from '@ngrx/store';
import { AppState, AUTH_CHANGE, LoginAction } from '../reducers/app-state-reducer';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  version: string = environment.version;
  error: string;

  constructor(private router: Router,
              public authService: AuthService,
              
              public state:State<LoginAction>
            ) {
  }

  ngOnInit() {
    this.state.pipe(
      select('appStateReducer'),
      select('loginStatus')
    ).subscribe(loginStatus=>{
      console.log(loginStatus)
      if(loginStatus.success)
      {
        
      }
    })
  }

  loginGoogle() {
    this.authService.doGoogleLogin()

  }
  loginFacebook() {
    this.authService.doFbLogin()

  }
  dispatchAuthResult(resp)
  {

  }

}
