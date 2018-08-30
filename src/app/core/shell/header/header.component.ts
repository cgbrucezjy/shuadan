import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';
import { State, select } from '@ngrx/store';
import { AuthChangeAction } from '../../../reducers/app-state-reducer';
import { AuthService } from '../../../services/authentication-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profile:any={
    photo:"assets/monkey.png"
  }
  constructor(public router:Router,public state:State<AuthChangeAction>,public authService:AuthService) { }

  ngOnInit(){
    this.state.pipe(
      select('appStateReducer'),
      select('profile')
    ).subscribe(profile=>{
      if(profile)
        this.profile = profile
    })
    //this.authService.getCurrentAuthUser()
  }

  logout() {
    this.authService.logout()
  }
  login(){
    this.router.navigate(['/login'], { replaceUrl: true });
  }

}
