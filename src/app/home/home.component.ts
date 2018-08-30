import { Component, OnInit } from '@angular/core';
import { sdFirebase } from '../services/sd-firebase';
import { ObservableMedia } from '@angular/flex-layout';

import { takeWhile,startWith, map } from 'rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';
import { State, select } from '@ngrx/store';
import { AppState } from '../reducers/app-state-reducer';
import { MatDialog } from '@angular/material';
import { UpdateDialogComponent } from '../components/update-dialog/update-dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products
  cols: Observable<number>;
  isAdmin
  userProfile
  constructor(
    public fb:sdFirebase,
    private observableMedia: ObservableMedia,
    public state:State<AppState>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.products = this.fb.products()
    const grid = new Map([
      ["xs", 1],
      ["sm", 2],
      ["md", 2],
      ["lg", 3],
      ["xl", 3]
    ]);
    let start: number;
    grid.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start = cols;
      }
    });
    this.cols = this.observableMedia.asObservable()
    .pipe(
      map(change => {
        console.log(change);
        console.log(grid.get(change.mqAlias));
        return grid.get(change.mqAlias);
      }),
      startWith(start)
    )

    this.state.pipe(
      select('appStateReducer'),
      select('isAdmin')
    ).subscribe(isAdmin=>{
      console.log(isAdmin)
      this.isAdmin = isAdmin
    })

    this.state.pipe(
      select('appStateReducer'),
      select('profile')
    ).subscribe(profile=>{
      console.log(profile)
      this.userProfile = profile
    })
  }
  addItem()
  {
    const updateDialogRef =  this.dialog.open(UpdateDialogComponent, {
      data: null,
    });
  }

}
