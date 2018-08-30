import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { State, Store } from '@ngrx/store';
import { AppState, SET_ADMIN } from '../reducers/app-state-reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.scss']
})
export class AdminPortalComponent implements OnInit {
  Password
  constructor(
    public snackBar: MatSnackBar,
    public store:Store<AppState>,
    public router:Router
  ) { }

  ngOnInit() {
  }
  enter()
  {
    console.log(this.Password)
    if(this.Password == "woshihqs")
    {
      this.store.dispatch({
        type:SET_ADMIN,
        payload:true
      })
      this.router.navigate(['/home'], { replaceUrl: true });
    }
    else
    {
      this.snackBar.open("Invalid password", "", {
        duration: 2000,
      });
    }
  }
}
